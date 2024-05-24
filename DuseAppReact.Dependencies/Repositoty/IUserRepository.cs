using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface IUserRepository<T> : ICollegeRepository<T>
    {
        Task<Result<T>> GetByEmail(string email);
        Task<Result<T>> GetByName(string name);
        Task<Result<T>> GetById(int id);
    }
}
