using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.Services.ResultService;

namespace DuseAppReact.Core.Dependencies
{
    public interface ICollegeDataConfiguration
    {
        Task<Result<List<CollegeData>>> GetColleges();

        Task<int> AddCollege(CollegeData collegeData);

        Task<Result<int>> DeleteCollege(int collegeId);

        Task<Result<int>> UpdateCollege(int collegeId, CollegeData collegeData);
    }
}
