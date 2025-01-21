using System;
using API.Entities;

namespace API.Interfaces;

public interface ITokens
{
    string CreateToken(AppUser user);

}
