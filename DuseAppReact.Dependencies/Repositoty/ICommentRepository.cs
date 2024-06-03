using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Models.Comment;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Dependencies.Repositoty
{
    public interface ICommentRepository<T>
    {
        Task<int> Create(T parameter, int collegeId);
        Task<int> Delete(int id);
        Task<int> Update(T parameter);
        Task<Result<List<T>>> GetByCollegeId(int id);
    }
}
