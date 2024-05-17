using DuseAppReact.Core.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace DuseAppReact.Server.Services
{
    public class UserAuthorizeAttribute : AuthorizeAttribute
    {
        public UserAuthorizeAttribute(Roles roles)
        {
            Roles = roles.ToString();
        }

        public UserAuthorizeAttribute(params Roles[] roles)
        {
            Roles = string.Join(",", roles.Select(r => r.ToString()));
        }
    }
}
