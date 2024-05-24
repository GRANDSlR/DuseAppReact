using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Auth
{
    public interface IJwtProvider
    {
        string GenerateToken(UserModel user);

        Result<UserModel> DecryptToken(string token);
    }
}