﻿using DuseAppReact.Core.Contracts;
using DuseAppReact.Core.Models.College;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Converters
{
    public class CollegeConverter
    {
        public static Result<CollegeData> CDRequestToCDModel(int collegeId, CollegeDataRequest collegeDataRequest)
        {
            var collegeHeader = CollegeHeader.Create(collegeId, 
                collegeDataRequest.collegeHeader.Title, 
                collegeDataRequest.collegeHeader.Img);

            if (!collegeHeader.IsSuccess)
                return Result<CollegeData>.Failure(collegeHeader.ErrorMessage);

            var collegeDescription = CollegeDescription.Create(collegeId, 1, 
                collegeDataRequest.collegeDescription.Description, 
                collegeDataRequest.collegeDescription.Grade,
                collegeDataRequest.collegeDescription.CollegeType,
                collegeDataRequest.collegeDescription.Ownership,
                collegeDataRequest.collegeDescription.WebSiteRef);

            if (!collegeDescription.IsSuccess)
                return Result<CollegeData>.Failure(collegeDescription.ErrorMessage);

            var collegeLocation = CollegeLocation.Create(collegeId, 1,
                collegeDataRequest.collegeLocation.Region,
                collegeDataRequest.collegeLocation.Lat,
                collegeDataRequest.collegeLocation.Long);

            if (!collegeLocation.IsSuccess)
                return Result<CollegeData>.Failure(collegeLocation.ErrorMessage);

            List<Result<Speсialty>> specialties = new List<Result<Speсialty>>();

            foreach(var specialty in collegeDataRequest.specialtyList)
            {
                specialties.Add(Speсialty.Create(
                    specialty.specialtyId, 
                    specialty.Title, 
                    specialty.Description, 
                    specialty.Cost, 
                    specialty.FreePlaces, 
                    specialty.EducationForm, 
                    specialty.PassingScore));
            }

            var specialtyStatus = Result<CollegeData>.ResultListInit(specialties);

            if (!specialtyStatus.IsSuccess)
                return Result<CollegeData>.Failure(specialtyStatus.ErrorMessage);
            
            return Result<CollegeData>.Success(new CollegeData(
                collegeHeader.Value,
                collegeDescription.Value,
                collegeLocation.Value,
                specialtyStatus.Value
            ));
        }
    }
}
