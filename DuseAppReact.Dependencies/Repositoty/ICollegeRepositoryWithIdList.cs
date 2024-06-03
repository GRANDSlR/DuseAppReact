using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface ICollegeRepositoryWithIdList<T> : IRepository<T>
    {
        Task<List<int>> GetById(int id);
    }
}
