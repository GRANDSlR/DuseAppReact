using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface ICollegeRepositoryWithIdList<T> : ICollegeRepository<T>
    {
        Task<List<int>> GetById(int id);
    }
}
