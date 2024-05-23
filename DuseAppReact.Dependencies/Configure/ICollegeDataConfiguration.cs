using DuseAppReact.Core.Models.College;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Configure
{
    public interface ICollegeDataConfiguration
    {
        Task<Result<List<Speсialty>>> GetAllSpecialties();

        Task<Result<List<CollegeData>>> GetColleges(string title);

        // Task<Result<List<CollegeData>>> GetCollegesByTitle(string title);

        Task<int> AddCollege(CollegeData collegeData);

        Task<Result<int>> DeleteCollege(int collegeId);

        Task<Result<int>> UpdateCollege(int collegeId, CollegeData collegeData);
    }
}
