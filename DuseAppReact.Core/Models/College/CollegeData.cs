using DuseAppReact.Services.Services;
namespace DuseAppReact.Core.Models.College
{
    public class CollegeData
    {
        public CollegeData(CollegeHeader collegeHeader, CollegeDescription collegeDescription, CollegeLocation collegeLocation, List<Speсialty> speсialtyList)
        {
            CollegeHeader = collegeHeader;
            CollegeDescription = collegeDescription;
            CollegeLocation = collegeLocation;
            SpecialtyList = speсialtyList;
        }

        public CollegeHeader CollegeHeader { get; } = null!;

        public CollegeDescription CollegeDescription { get; } = null!;

        public CollegeLocation CollegeLocation { get; } = null!;

        public List<Speсialty> SpecialtyList { get; } = null!;


        /*public static Result<CollegeData> Create(Result<CollegeHeader> collegeHeader, Result<CollegeDescription> collegeDescription, Result<CollegeLocation> collegeLocation, List<Result<Speсialty>> speсialtyList)
        {

            var speсialtyListInit = Result<Speсialty>.ResultListInit(speсialtyList);


            if (!collegeHeader.IsSuccess)
                return Result<CollegeData>.Failure("Ошибка инициализации заголовка колледжа:\n" + collegeHeader.ErrorMessage);

            if (!collegeDescription.IsSuccess)
                return Result<CollegeData>.Failure("Ошибка инициализации описания колледжа:\n" + collegeDescription.ErrorMessage);

            if (!collegeLocation.IsSuccess)
                return Result<CollegeData>.Failure("Ошибка инициализации геоолокации колледжа:\n" + collegeLocation.ErrorMessage);

            if (!speсialtyListInit.IsSuccess)
                return Result<CollegeData>.Failure("Ошибка инициализации списка специальностей колледжа:\n" + speсialtyListInit.ErrorMessage);


            return Result<CollegeData>.Success(
                new CollegeData(collegeHeader.Value, collegeDescription.Value, collegeLocation.Value, speсialtyListInit.Value)
            );

        }*/

    }
}
