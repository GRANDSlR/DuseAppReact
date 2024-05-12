using DuseAppReact.Application.Interfaces.Auth;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.DataAccess;
using DuseAppReact.DataAccess.Repositories.UserRepository;

namespace DuseAppReact.Services.Services
{
    public class UsersService : IUsersService
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtProvider _jwtProvider;

        public UsersService(IJwtProvider jwtProvider, IPasswordHasher passwordHasher)
        {
            _passwordHasher = passwordHasher;
            _jwtProvider = jwtProvider;
        }

        public async Task<Result<string>> Register(string name, string email, string password)
        {
            string hashedPassword = _passwordHasher.Generate(password);

            var user = UserModel.Create(1, name, email, hashedPassword);

            if (!user.IsSuccess)
                return Result<string>.Failure(user.ErrorMessage);

            using (var context = new DatabaseContext())
            {
                await new UserRepository(context).Create(user.Value);
            }

            return Result<string>.Success("");
        }

        public async Task<Result<string>> Login(string email, string password)
        {
            using (var context = new DatabaseContext())
            {
                var user = await new UserRepository(context).GetByEmail(email);

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
}
