using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface ICollegeRepositoryWithTitle<T> : IRepository<T>
    {
        Task<List<Result<T>>> GetByTitle(string title);
    }
}
