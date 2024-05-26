using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Application.Services;
using DuseAppReact.Core.Contracts;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace DuseAppReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IUserRepository<UserModel> _userRepository;

        public UserController(IUsersService usersService, IUserRepository<UserModel> userRepository)
        {
            _usersService = usersService;
            _userRepository = userRepository;
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

            return Ok($"\"{userRegister.Value}\"");
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

            return Ok($"\"{userToken.Value}\"");

        }

        [HttpPost("getuserbytoken")]
        public async Task<ActionResult<UserModel>> GetUserByToken([FromBody] UserTokenResponce userTokenResponce)
        {
            var user = await _usersService.GetUserByToken(userTokenResponce.Token);

            if (!user.IsSuccess)
                return BadRequest(user.ErrorMessage);

            return Ok(user.Value);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<int>> UpdateUser(int id, [FromBody] UserUpdateResponce userUpdateResponce)
        {
            var user = UserModel.Create(id, userUpdateResponce.UserName, userUpdateResponce.Email, "");

            if (!user.IsSuccess)
                return BadRequest(user.ErrorMessage);

            int updatedUserId = await _userRepository.Update(user.Value);

            return Ok(updatedUserId);
        }


    }
}
