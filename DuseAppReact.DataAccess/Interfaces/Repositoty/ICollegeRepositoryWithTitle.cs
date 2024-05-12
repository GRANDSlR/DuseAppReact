using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface ICollegeRepositoryWithTitle<T> : ICollegeRepository<T>
    {
        Task<List<Result<T>>> GetByTitle(string title);
    }
}
