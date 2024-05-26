using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.DataAccess.Entities.User;
using DuseAppReact.Services.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.UserRepository
{
    public class UserRepository : IUserRepository<UserModel>
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Result<UserModel>> GetByEmail(string email)
        {
            var userEntities = await _context.Users
                .FirstOrDefaultAsync(b => b.Email == email);

            if (userEntities == null)
                return Result<UserModel>.Failure("Значение было null");

            var users = UserModel.Create(userEntities.Id, userEntities.Name, userEntities.Email, userEntities.PasswordHash, userEntities.Role);

            return users;
        }

        public async Task<Result<UserModel>> GetById(int id)
        {
            var userEntities = await _context.Users
                .FirstOrDefaultAsync(b => b.Id == id);

            if (userEntities == null)
                return Result<UserModel>.Failure("Значение было null");

            var users = UserModel.Create(userEntities.Id, userEntities.Name, userEntities.Email, userEntities.PasswordHash, userEntities.Role);

            return users;
        }

        public async Task<Result<UserModel>> GetByName(string name)
        {
            var userEntities = await _context.Users
                .FirstOrDefaultAsync(b => b.Name == name);

            if (userEntities == null)
                return Result<UserModel>.Failure("Значение было null");

            var users = UserModel.Create(userEntities.Id, userEntities.Name, userEntities.Email, userEntities.PasswordHash, userEntities.Role);

            return users;
        }

        public async Task<List<Result<UserModel>>> Get()
        {
            var userEntities = await _context.Users
                .AsNoTracking()
                .ToListAsync();

            var users = userEntities
                .Select(a => UserModel.Create(a.Id, a.Name, a.Email, a.PasswordHash, a.Role))
                .ToList();

            return users;
        }

        public async Task<int> Create(UserModel user)
        {
            var userEntity = new UserEntity
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                Role = user.Role.ToString()
            };

            await _context.Users.AddAsync(userEntity);
            await _context.SaveChangesAsync();

            return userEntity.Id;
        }

        public async Task<int> Update(UserModel user)
        {
            await _context.Users
                .Where(b => b.Id == user.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.Name, b => user.Name)
                    .SetProperty(b => b.Email, b => user.Email));

            return user.Id;
        }

        public async Task<int> Delete(int id)
        {
            await _context.Users
                .Where(b => b.Id == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
