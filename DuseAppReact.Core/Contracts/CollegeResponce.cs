namespace DuseAppReact.Core.Contracts
{
    public record CollegeDataRequest
    (
        CollegeHeaderRequest collegeHeaderRequest,
        CollegeDescriptionRequest collegeDescriptionRequest,
        CollegeLocationRequest collegeLocationRequest,
        List<SpecialtyRequest> specialtyRequestList
    );
    public record CollegeFilterRequest(
        string title,
        string[] specialties,
        string[] educationForm,
        string[] collegeTypeFilterParams, 
        string[] costValues
        );
    public record CollegeHeaderRequest(
        string Title,
        string Img
        );

    public record CollegeDescriptionRequest(
        string Description,
        int Grade,
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
