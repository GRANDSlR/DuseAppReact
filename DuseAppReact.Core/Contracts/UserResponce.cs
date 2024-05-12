using System.Globalization;

namespace DuseAppReact.Core.Contracts
{
    public record UserRegisterResponce
    (
        string UserName,
        string Email,
        string Password
    );

    public record UserLoginResponce
    (
        string Email,
        string Password
    );
}
