using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Application.Interfaces.Configure;
using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Application.Services;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.DataAccess;
using DuseAppReact.DataAccess.Configurations.College;
using DuseAppReact.DataAccess.Repositories.CollegeRep;
using DuseAppReact.DataAccess.Repositories.UserRepository;
using DuseAppReact.Infrastructure;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

var configuration = builder.Configuration;

builder.Services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICollegeRepositoryWithTitle<CollegeHeader>, CollegeHeaderRepository>();
builder.Services.AddScoped<ICollegeRepositoryWithId<CollegeDescription>, CollegeDescriptionRepository>();
builder.Services.AddScoped<ICollegeRepositoryWithId<CollegeLocation>, CollegeLocationRepository>();
builder.Services.AddScoped<ICollegeRepositoryWithId<Speñialty>, CollegeSpecialtyRepository>();
builder.Services.AddScoped<ICollegeRepositoryWithIdList<College_Specialty>, College_SpecialtyRepository>();
builder.Services.AddScoped<IUserRepository<UserModel>, UserRepository>();


builder.Services.AddScoped<ICollegeDataConfiguration, CollegeDataConfiguration>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IUsersService, UsersService>();


builder.Services.AddDbContext<DatabaseContext>(options =>
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
