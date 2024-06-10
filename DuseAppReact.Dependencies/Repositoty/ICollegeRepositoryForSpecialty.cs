using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Dependencies.Repositoty
{
    public interface ICollegeRepositoryForSpecialty<T> : ICollegeRepositoryWithId<T>
    {
        Task<Result<int>> Update(T parameter, int collegeId);
    }
}
