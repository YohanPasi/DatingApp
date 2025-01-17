using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.UsersControllers;

[ApiController]

[Route("api/[controller]")]


public class UsersController(DataContext context) : ControllerBase
{
   
    [HttpGet] //List down Users
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = context.Users.ToList();

        return Ok(users);
    }

    [HttpGet("{id:int}")] //  /api/users/2
    public ActionResult<AppUser> GetUsers(int id)
    {
        var user = context.Users.Find();

        if(user == null) return NotFound();

        return user;
    }

}
