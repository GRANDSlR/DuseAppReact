using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface IUserRepository<T> : ICollegeRepository<T>
    {
        Task<Result<T>> GetByEmail(string email);
    }
}
