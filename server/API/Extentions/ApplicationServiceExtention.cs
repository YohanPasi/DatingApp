using System;
using API.Data;
using API.Services;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions;

public static class ApplicationServiceExtention
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt => 
        {
            opt.UseSqlite(config.GetConnectionString("Default Connection"));
        }
        );      
    
        services.AddCors();
        services.AddScoped<TokenService, TokenService>();

        return services;
    }
}
