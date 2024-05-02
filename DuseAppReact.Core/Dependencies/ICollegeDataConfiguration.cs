﻿using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.Services.ResultService;

namespace DuseAppReact.Core.Dependencies
{
    public interface ICollegeDataConfiguration
    {
        Task<Result<List<Speсialty>>> GetAllSpecialties();

        Task<Result<List<CollegeData>>> GetColleges();

        Task<Result<List<CollegeData>>> GetCollegesByTitle(string title);

        Task<int> AddCollege(CollegeData collegeData);

        Task<Result<int>> DeleteCollege(int collegeId);

        Task<Result<int>> UpdateCollege(int collegeId, CollegeData collegeData);
    }
}
