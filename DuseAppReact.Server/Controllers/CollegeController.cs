using DuseAppReact.Application.Interfaces.Configure;
using DuseAppReact.Core.Contracts;
using DuseAppReact.Core.Converters;
using DuseAppReact.Core.Models.College;
using DuseAppReact.Core.Models.UserModel;
using DuseAppReact.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Reflection.Metadata;

namespace DuseAppReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CollegeController : ControllerBase
    {
        private readonly ICollegeDataConfiguration _collegeDataConfiguration;

        public CollegeController(ICollegeDataConfiguration collegeDataConfiguration)
        {
            _collegeDataConfiguration = collegeDataConfiguration;
        }

/*        [UserAuthorize(Roles.admin, Roles.user)]
        [HttpGet("All")]
        public async Task<ActionResult<string>> GetAll() => Ok("all");

        [UserAuthorize(Roles.user)]
        [HttpGet("user")]
        public async Task<ActionResult<string>> GetUser() => Ok("User");

        [UserAuthorize(Roles.admin)]
        [HttpGet("admin")]
        public async Task<ActionResult<string>> GetAdmin() => Ok("Admin");*/

        
        [HttpGet("getcollegesbytitle")]
        public async Task<ActionResult<List<CollegeData>>> GetCollgesByTitle(string? title)
        {

            var CollegeHeaderResultList = await _collegeDataConfiguration.GetColleges(title);

            if (!CollegeHeaderResultList.IsSuccess)
                return BadRequest(CollegeHeaderResultList.ErrorMessage);

            return Ok(CollegeHeaderResultList.Value);
        }

        [HttpPost("getcollegesbyfilterparams")]
        public async Task<ActionResult<List<CollegeData>>> GetCollegesByFilterParams([FromBody] CollegeFilterRequest collegeFilterRequest)
        {

            var CollegeHeaderResultList = await _collegeDataConfiguration.GetColleges(collegeFilterRequest.title);

            if (!CollegeHeaderResultList.IsSuccess)
                return BadRequest(CollegeHeaderResultList.ErrorMessage);

            var FilteredCollegeList = CollegeHeaderResultList.Value.Where(
                college => collegeFilterRequest.collegeTypeFilterParams.ToList().Contains(college.CollegeDescription.CollegeType.ToString())
                && (collegeFilterRequest.specialties.ToList().Count()>0 ? college.SpecialtyList.Where(specialty => collegeFilterRequest.specialties.ToList().Contains(specialty.Title)).ToList().Count() > 0 : true)
                && college.SpecialtyList.Where(specialty => collegeFilterRequest.educationForm.ToList().Contains(specialty.EducationForm.ToString())).ToList().Count() > 0
                && college.SpecialtyList.Where(specialty => specialty.Cost >= Convert.ToDouble(collegeFilterRequest.costValues.ToList()[0]) && specialty.Cost <= Convert.ToDouble(collegeFilterRequest.costValues.ToList()[1])).ToList().Count() > 0
            );

            return Ok(FilteredCollegeList);
        }

        [HttpPost("getcollegesbyspecialtykeys")]
        public async Task<ActionResult<List<CollegeData>>> GetCollegesBySpecialtyKeys([FromBody] SpecialtyKeyRequest specialtyKeyRequest)
        {

            var CollegeHeaderResultList = await _collegeDataConfiguration.GetColleges("");

            if (!CollegeHeaderResultList.IsSuccess)
                return BadRequest(CollegeHeaderResultList.ErrorMessage);

            var FilteredCollegeList = CollegeHeaderResultList.Value
                .Where(college => college.SpecialtyList
                .Where(specialty => specialtyKeyRequest.keys.Any(element => specialty.Description.Contains(element))).ToList().Count > 0).ToList();


            return Ok(FilteredCollegeList);
        }

        [HttpGet("getallspecialties")]
        public async Task<ActionResult<List<string>>> GetAllSpecialties()
        {
            var SpecialtiesResultList = await _collegeDataConfiguration.GetAllSpecialties();

            if (!SpecialtiesResultList.IsSuccess)
                return BadRequest(SpecialtiesResultList.ErrorMessage);

            return Ok(SpecialtiesResultList.Value.Select(a => a.Title).Distinct().ToList());
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddCollege([FromBody] CollegeDataRequest collegeDataRequest)
        {
            var CollegeDataResult = CollegeConverter.CDRequestToCDModel(new Random().Next(10000000, 99999999), collegeDataRequest);

            if (!CollegeDataResult.IsSuccess)
                return BadRequest(CollegeDataResult.ErrorMessage);

            return Ok(await _collegeDataConfiguration.AddCollege(CollegeDataResult.Value));
        }   

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<int>> DeleteCollege(int id) 
            => Ok(await _collegeDataConfiguration.DeleteCollege(id));

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CollegeData>> UpdateCollege(int id, [FromBody] CollegeDataRequest collegeDataRequest)
        {
            var CollegeDataResult = CollegeConverter.CDRequestToCDModel(id, collegeDataRequest);

            if (!CollegeDataResult.IsSuccess)
                return BadRequest(CollegeDataResult.ErrorMessage);

            return Ok(await _collegeDataConfiguration.UpdateCollege(id, CollegeDataResult.Value));
        }

        [HttpPut("updategrade/{id:int}")]
        public async Task<ActionResult<int>> UpdateGrade(int id, [FromBody] GradeUpdateRequest gradeUpdateRequest) 
            => Ok(await _collegeDataConfiguration.UpdateGrade(id, gradeUpdateRequest.grade));
    }
}
