using DuseAppReact.Services.Services;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace DuseAppReact.Core.Models.UserModel
{
    public class UserModel
    {
        private const int NAME_MAX_LENGTH = 80;
        private const int PASSWORD_MAX_LENGTH = 100;
        private UserModel(int id, string name, string email, string passwordHash)
        {
            Id = id;
            Name = name;
            Email = email;
            PasswordHash = passwordHash;
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }

        public static Result<UserModel> Create (int id, string name, string email, string passwordHash)
        {
            if (name.Length > NAME_MAX_LENGTH)
                return Result<UserModel>.Failure($"Длинна строки имени не должна превышать {NAME_MAX_LENGTH} символов");

            if (!Regex.IsMatch(email, @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"))
                return Result<UserModel>.Failure("Это не email");

            if (passwordHash.Length > PASSWORD_MAX_LENGTH)
                return Result<UserModel>.Failure($"Пароль не должен превышать {PASSWORD_MAX_LENGTH} символов");


            return Result<UserModel>.Success(new UserModel(id, name, email, passwordHash));
        }
    }
}
