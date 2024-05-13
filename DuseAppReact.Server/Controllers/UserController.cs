using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Core.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DuseAppReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UserController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromBody] UserRegisterResponce userRegisterResponce)
        {
            var userRegister = await _usersService.Register(
                userRegisterResponce.UserName,
                userRegisterResponce.Email,
                userRegisterResponce.Password);

            if (!userRegister.IsSuccess)
                return BadRequest(userRegister.ErrorMessage);

            return Ok(userRegister.Value);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] UserLoginResponce userLoginResponce)
        {
            var userToken = await _usersService.Login(
                userLoginResponce.Email,
                userLoginResponce.Password);

            if (!userToken.IsSuccess)
                return BadRequest(userToken.ErrorMessage);

            HttpContext.Response.Cookies.Append("space-cookies", userToken.Value);

            return Ok(userToken.Value); 
        }
    }
}
