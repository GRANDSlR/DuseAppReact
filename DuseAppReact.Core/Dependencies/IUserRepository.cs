
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Dependencies
{
    public interface IUserRepository
    {
        Task<int> Create(UserModel parameter);
        Task<int> Delete(int id);
        Task<List<Result<UserModel>>> Get();
        Task<List<Result<UserModel>>> GetByEmail(string email);
        Task<int> Update(UserModel parameter);
    }
}
