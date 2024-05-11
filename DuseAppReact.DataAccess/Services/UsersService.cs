
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

        public async Task Register(string name, string email, string password)
        {
            string hashedPassword = _passwordHasher.Generate(password);

            var user = UserModel.Create(1, name, email, hashedPassword);

            if (!user.IsSuccess)
                return;

            await _userRepository.Create(user.Value);

        }
    }
}
