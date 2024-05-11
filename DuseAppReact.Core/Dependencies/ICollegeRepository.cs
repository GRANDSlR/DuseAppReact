using DuseAppReact.Core.Models.College;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Dependencies
{
    public interface ICollegeRepository<T>
    {
        Task<int> Create(T parameter);
        Task<int> Delete(int id);
        Task<List<Result<T>>> Get();
        /*Task<List<Result<T>>> GetByTitle(string title);*/
        Task<int> Update(T parameter);
    }
}
