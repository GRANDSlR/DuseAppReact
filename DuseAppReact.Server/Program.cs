using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Application.Interfaces.Configure;
using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Application.Services;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.Core.Models.Comment;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.DataAccess;
using DuseAppReact.DataAccess.Configurations.College;
using DuseAppReact.DataAccess.Repositories.CollegeRep;
using DuseAppReact.DataAccess.Repositories.Comment;
using DuseAppReact.DataAccess.Repositories.UserRepository;
using DuseAppReact.Dependencies.Repositoty;
using DuseAppReact.Infrastructure;
using DuseAppReact.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

var configuration = builder.Configuration;


services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));

services.AddControllers();

var jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtOptions!.SecretKey))
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["space-cookies"];

                return Task.CompletedTask;
            }
        };
    });

services.AddAuthorization();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddScoped<ICollegeRepositoryWithTitle<CollegeHeader>, CollegeHeaderRepository>();
services.AddScoped<ICollegeRepositoryWithIdAndGrade<CollegeDescription>, CollegeDescriptionRepository>();
services.AddScoped<ICollegeRepositoryWithId<CollegeLocation>, CollegeLocationRepository>();
services.AddScoped<ICollegeRepositoryWithId<Speñialty>, CollegeSpecialtyRepository>();
services.AddScoped<ICollegeRepositoryWithIdList<College_Specialty>, College_SpecialtyRepository>();
services.AddScoped<IUserRepository<UserModel>, UserRepository>();

services.AddScoped<ICommentRepository<CommentModel>, CommentRepository>();


services.AddScoped<ICollegeDataConfiguration, CollegeDataConfiguration>();
services.AddScoped<IJwtProvider, JwtProvider>();
services.AddScoped<IPasswordHasher, PasswordHasher>();
services.AddScoped<IUsersService, UsersService>();


services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("DBConnection"));
});


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCookiePolicy(new CookiePolicyOptions //https://developer.mozilla.org/ru/docs/Web/HTTP/Cookies
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
    HttpOnly = HttpOnlyPolicy.None,
    Secure = CookieSecurePolicy.Always
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseCors(x =>
{
    x.WithHeaders().AllowAnyHeader();
    x.WithOrigins("https://localhost:5173");
    x.WithMethods().AllowAnyMethod();
});

app.Run();
