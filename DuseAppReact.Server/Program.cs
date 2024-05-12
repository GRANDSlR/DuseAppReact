using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Application.Interfaces.Configure;
using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Application.Services;
using DuseAppReact.DataAccess;
using DuseAppReact.DataAccess.Configurations.College;
using DuseAppReact.DataAccess.Repositories.UserRepository;
using DuseAppReact.Infrastructure;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

var configuration = builder.Configuration;

builder.Services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICollegeDataConfiguration, CollegeDataConfiguration>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IUsersService, UsersService>();


/*builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("YourConnectionString"));
});*/

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

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
