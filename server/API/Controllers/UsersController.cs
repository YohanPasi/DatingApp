using System;
using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.UsersControllers;

//  [ApiController]

//  [Route("api/[controller]")]

[Authorize]
public class UsersController(DataContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet] //List down Users

    // [Route("all")]
    public async Task <ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")] //  /api/users/2
    public async Task <ActionResult<AppUser>> GetUsers(int id)
    {
        var user = await context.Users.FindAsync(id);

        if(user == null) return NotFound();

        return user;
    }

}
