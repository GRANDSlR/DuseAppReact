using DuseAppReact.Core.Dependencies;
using DuseAppReact.DataAccess.Configurations.College;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICollegeDataConfiguration, CollegeDataConfiguration>();


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
