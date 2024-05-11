
using DuseAppReact.Core.Dependencies;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Infrastructure;

namespace DuseAppReact.Services.Services
{
    public class UsersService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public UsersService(IUserRepository userRepository, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<Result<string>> Register(string name, string email, string password)
        {
            string hashedPassword = _passwordHasher.Generate(password);

            var user = UserModel.Create(1, name, email, hashedPassword);

            if (!user.IsSuccess)
                return Result<string>.Failure(user.ErrorMessage);

            await _userRepository.Create(user.Value);

            return Result<string>.Success(null);
        }

        public async Task<Result<string>> Login(string email, string password)
        {
            var user = await _userRepository.GetByEmail(email);

            if(!user.IsSuccess)
                return Result<string>.Failure(user.ErrorMessage);

            var result = _passwordHasher.Verify(password, user.Value.PasswordHash);

            if(!result)
                return Result<string>.Failure("Пароль не верен");

            return Result<string>.Success(null);

        }
    }
}
