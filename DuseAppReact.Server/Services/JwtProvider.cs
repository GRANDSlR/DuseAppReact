using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Services.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DuseAppReact.Application.Services
{
    public class JwtProvider(IOptions<JwtOptions> options) : IJwtProvider
    {
        private readonly JwtOptions _options = options.Value;
        public string GenerateToken(UserModel user)
        {
            Claim[] claims = 
            [
                new("userId", user.Id.ToString()),
                new("userName", user.Name),
                new("userEmail", user.Email),
                new(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString())
            ];

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddHours(_options.ExpitesHour)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Result<UserModel> DecryptToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_options.SecretKey);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            SecurityToken validatedToken;
            var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

            var claimsIdentity = principal.Identity as ClaimsIdentity;

            var userIdClaim = claimsIdentity.FindFirst("userId");
            var userNameClaim = claimsIdentity.FindFirst("userName");
            var userEmailClaim = claimsIdentity.FindFirst("userEmail");
            var roleClaim = claimsIdentity.FindFirst(ClaimsIdentity.DefaultRoleClaimType);

            if (userIdClaim != null && userNameClaim != null && userEmailClaim != null && roleClaim != null)
            {
                var userModel = UserModel.Create
                (
                    int.Parse(userIdClaim.Value),
                    userNameClaim.Value.ToString(),
                    userEmailClaim.Value.ToString(),
                    "", // password
                    roleClaim.Value.ToString()

                );

                if (!userModel.IsSuccess)
                    return Result<UserModel>.Failure("Ошибка определения пользователя");

                return Result<UserModel>.Success(userModel.Value);
            }

            return Result<UserModel>.Failure("Ошибка определения токена");
        }

    }
}
