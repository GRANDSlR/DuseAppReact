using DuseAppReact.Core.Models.UserModel;

namespace DuseAppReact.Application.Interfaces.Auth
{
    public interface IJwtProvider
    {
        string GenerateToken(UserModel user);
    }
}