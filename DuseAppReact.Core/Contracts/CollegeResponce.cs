﻿namespace DuseAppReact.Core.Contracts
{
    public record CollegeDataRequest
    (
        CollegeHeaderRequest collegeHeader,
        CollegeDescriptionRequest collegeDescription,
        CollegeLocationRequest collegeLocation,
        SpecialtyRequest[] specialtyList
    );

    public record SpecialtyKeyRequest(
        string[] keys
        );

    public record CollegeFilterRequest(
        string title,
        string[] specialties,
        string[] educationForm,
        string[] collegeTypeFilterParams, 
        string[] costValues
        );
    public record CollegeHeaderRequest(
        int collegeId,
        string Title,
        string Img
        );

    public record CollegeDescriptionRequest(
        string Description,
        double Grade,
        string CollegeType,
        string Ownership,
        string WebSiteRef
        );

    public record CollegeLocationRequest(
        string Region,
        double Lat,
        double Long
        );

    public record SpecialtyRequest(
        int specialtyId,
        string Title,
        string Description,
        double Cost,
        int FreePlaces,
        string EducationForm,
        double PassingScore
        );

    public record GradeUpdateRequest(
        int grade
        );
}
