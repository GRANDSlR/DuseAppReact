using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Models.UserModel;

namespace DuseAppReact.Services.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUserRepository<UserModel> _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtProvider _jwtProvider;

        public UsersService(IUserRepository<UserModel> userRepository, IJwtProvider jwtProvider, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtProvider = jwtProvider;
        }

        public async Task<Result<string>> Register(string name, string email, string password)
        {
            string hashedPassword = _passwordHasher.Generate(password);

            var user = UserModel.Create(1, name, email, hashedPassword);

            if (!user.IsSuccess)
                return Result<string>.Failure(user.ErrorMessage);

            await _userRepository.Create(user.Value);

            return Result<string>.Success("");
        }

        public async Task<Result<string>> Login(string email, string password)
        {
            var user = await _userRepository.GetByEmail(email);

            if (!user.IsSuccess)
                return Result<string>.Failure(user.ErrorMessage);

            var result = _passwordHasher.Verify(password, user.Value.PasswordHash);

            if (!result)
                return Result<string>.Failure("Пароль не верен");

            var token = _jwtProvider.GenerateToken(user.Value);

            return Result<string>.Success(token);
        }
    }
}
