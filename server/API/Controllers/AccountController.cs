using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, TokenService tokenService) : BaseApiController
{

    [HttpPost("register")] // Register New User 

    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if(await UserExists(registerDto.Username)) return BadRequest("UserName Already Taken !");

        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDto.Username.ToLower(),
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            passwordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();


        return new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    } 


    
    [HttpPost("login")]

    public async Task<ActionResult<UserDto>>Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x=> x.UserName == loginDto.Username.ToLower());

        if(user == null) return Unauthorized("Invalide Username Or Password");

        using var hmac = new HMACSHA512(user.passwordSalt);

        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < ComputeHash.Length; i++)
        {
            if(ComputeHash[i] != user.passwordHash[i]) return Unauthorized("Invalid Password !");
        }

         return new UserDto
         {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
         };
    }


    private async Task<bool>UserExists(string Username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == Username.ToLower());
    }

}
