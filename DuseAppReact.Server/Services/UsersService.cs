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

        private async Task<bool> IsUniqueEmail(string email)
        {
            var appropriateEmail = await _userRepository.GetByEmail(email);
            return !appropriateEmail.IsSuccess || appropriateEmail.Value == null;
        }

        private async Task<bool> IsUniqueName(string name)
        {
            var appropriateName = await _userRepository.GetByName(name);
            return !appropriateName.IsSuccess || appropriateName.Value == null;
        }

        public async Task<Result<string>> Register(string name, string email, string password)
        {
            string hashedPassword = _passwordHasher.Generate(password);

            var user = UserModel.Create(new Random().Next(100000000, 999999999), name, email, hashedPassword);

            if (!user.IsSuccess)
                return Result<string>.Failure(user.ErrorMessage);

            if (!await IsUniqueEmail(email))
                return Result<string>.Failure("Пользователь с таким Email уже существует");

            if (!await IsUniqueName(name))
                return Result<string>.Failure("Пользователь с таким именем уже существует");

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

        public async Task<Result<UserModel>> GetUserByToken(string token)
        {
            var user = _jwtProvider.DecryptToken(token);

            if (!user.IsSuccess)
                return Result<UserModel>.Failure(user.ErrorMessage);

            var userFromDB = await _userRepository.GetById(user.Value.Id);

            if (!userFromDB.IsSuccess)
                return Result<UserModel>.Failure(user.ErrorMessage);

            return Result<UserModel>.Success(user.Value);
        }
    }
}
