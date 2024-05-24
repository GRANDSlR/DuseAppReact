using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Auth
{
    public interface IUsersService
    {
        Task<Result<string>> Login(string email, string password);
        Task<Result<string>> Register(string name, string email, string password);
        Task<Result<UserModel>> GetUserByToken(string token);
    }
}