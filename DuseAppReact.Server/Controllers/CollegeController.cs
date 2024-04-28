﻿using DuseAppReact.Core.Contracts;
using DuseAppReact.Core.Converters;
using DuseAppReact.Core.Dependencies;
using DuseAppReact.Core.Models.College;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<ActionResult<List<CollegeData>>> GetCollges()
        {
            var CollegeHeaderResultList = await _collegeDataConfiguration.GetColleges();

            if (!CollegeHeaderResultList.IsSuccess)
                return BadRequest(CollegeHeaderResultList.ErrorMessage);

            return Ok(CollegeHeaderResultList.Value);
        }

        [HttpGet("{title:string}")]
        public async Task<ActionResult<List<CollegeData>>> GetCollgesByTitle(string title)
        {
            var CollegeHeaderResultList = await _collegeDataConfiguration.GetColleges();

            if (!CollegeHeaderResultList.IsSuccess)
                return BadRequest(CollegeHeaderResultList.ErrorMessage);

            return Ok(CollegeHeaderResultList.Value);
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
        {
            return Ok(await _collegeDataConfiguration.DeleteCollege(id));
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<int>> UpdateCollege(int id, [FromBody] CollegeDataRequest collegeDataRequest)
        {
            var CollegeDataResult = CollegeConverter.CDRequestToCDModel(id, collegeDataRequest);

            if (!CollegeDataResult.IsSuccess)
                return BadRequest(CollegeDataResult.ErrorMessage);

            return Ok(await _collegeDataConfiguration.UpdateCollege(id, CollegeDataResult.Value));
        }
    }
}
