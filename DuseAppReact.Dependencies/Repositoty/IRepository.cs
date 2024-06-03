using DuseAppReact.Core.Models.College;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface IRepository<T>
    {
        Task<int> Create(T parameter);
        Task<int> Delete(int id);
        Task<List<Result<T>>> Get();
        Task<int> Update(T parameter);
    }
}
