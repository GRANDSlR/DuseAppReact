using DuseAppReact.Core.Dependencies;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Repositories.CollegeRep;
using DuseAppReact.Services.Services;

namespace DuseAppReact.DataAccess.Configurations.College
{
    public class CollegeDataConfiguration : ICollegeDataConfiguration
    {
        public async Task<Result<List<Speсialty>>> GetAllSpecialties()
        {
            using (var context = new DatabaseContext())
                return Result<Speсialty>.ResultListInit(await new CollegeSpecialtyRepository(context).Get()); ;
        }

        public async Task<Result<List<CollegeData>>> GetColleges()
        {

            List<CollegeData> Colleges = new List<CollegeData>();


            using (var context = new DatabaseContext())
            {

                var CollegeHeaderResultList = Result<CollegeData>.ResultListInit(await new CollegeHeaderRepository(context).Get());

                if (!CollegeHeaderResultList.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeHeaderResultList.ErrorMessage);

                var CollegeDescriptionResultList = Result<CollegeData>.ResultListInit(await new CollegeDescriptionRepository(context).Get());

                if (!CollegeDescriptionResultList.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeDescriptionResultList.ErrorMessage);

                var CollegeLocationResultList = Result<CollegeData>.ResultListInit(await new CollegeLocationRepository(context).Get());

                if (!CollegeLocationResultList.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeLocationResultList.ErrorMessage);

                var CollegeSpecialtyResultList = Result<CollegeData>.ResultListInit(await new CollegeSpecialtyRepository(context).Get());

                if (!CollegeSpecialtyResultList.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeSpecialtyResultList.ErrorMessage);

                var College_SpecialtyResultList = Result<CollegeData>.ResultListInit(await new College_SpecialtyRepository(context).Get());

                if (!College_SpecialtyResultList.IsSuccess)
                    return Result<List<CollegeData>>.Failure(College_SpecialtyResultList.ErrorMessage);


                foreach (CollegeHeader CurrCollegeHeaderObj in CollegeHeaderResultList.Value)
                {

                    var CurrSpecialtyIds = College_SpecialtyResultList.Value
                        .Where(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId)
                        .Select(a => a.SpecialtyId)
                        .ToList();


                    Colleges.Add(new CollegeData(

                        CollegeHeaderResultList.Value.FirstOrDefault(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId),

                        CollegeDescriptionResultList.Value.FirstOrDefault(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId),

                        CollegeLocationResultList.Value.FirstOrDefault(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId),

                        CollegeSpecialtyResultList.Value
                            .Where(a => CurrSpecialtyIds
                            .Contains(a.SpecialtyId))
                            .ToList()
                        ));
                }

                return Result<List<CollegeData>>.Success(Colleges);

            }
        }

        public async Task<Result<List<CollegeData>>> GetCollegesByTitle(string title)
        {

            List<CollegeData> Colleges = new List<CollegeData>();


            using (var context = new DatabaseContext())
            {
                var CollegeHeaderResultList = Result<CollegeData>.ResultListInit(await new CollegeHeaderRepository(context).GetByTitle(title));

                if (!CollegeHeaderResultList.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeHeaderResultList.ErrorMessage);

                foreach (var collegeHeader in CollegeHeaderResultList.Value)
                {
                    var CollegeDescriptionResult = await new CollegeDescriptionRepository(context).GetById(collegeHeader.CollegeId);

                    if (!CollegeDescriptionResult.IsSuccess)
                        return Result<List<CollegeData>>.Failure(CollegeDescriptionResult.ErrorMessage);

                    var CollegeLocationResult = await new CollegeLocationRepository(context).GetById(collegeHeader.CollegeId);

                    if (!CollegeLocationResult.IsSuccess)
                        return Result<List<CollegeData>>.Failure(CollegeLocationResult.ErrorMessage);

                    List<Speсialty> SpeсialtyList = new List<Speсialty>();

                    var College_SpecialtyIdList = await new College_SpecialtyRepository(context).GetById(collegeHeader.CollegeId);

                    foreach(int College_SpecialtyId in College_SpecialtyIdList)
                    {
                        var CollegeSpecialtyResult = await new CollegeSpecialtyRepository(context).GetById(College_SpecialtyId);

                        if (!CollegeSpecialtyResult.IsSuccess)
                            return Result<List<CollegeData>>.Failure(CollegeSpecialtyResult.ErrorMessage);

                        SpeсialtyList.Add(CollegeSpecialtyResult.Value);
                    }

                    Colleges.Add(new CollegeData(
                        collegeHeader, 
                        CollegeDescriptionResult.Value,
                        CollegeLocationResult.Value,
                        SpeсialtyList));
                }
            }

            return Result<List<CollegeData>>.Success(Colleges);
        }

        public async Task<int> AddCollege(CollegeData collegeData)
        {
            using (var context = new DatabaseContext())
            {
                int collegeId = await new CollegeHeaderRepository(context).Create(collegeData.CollegeHeader);

                int locationId = await new CollegeLocationRepository(context).Create(collegeData.CollegeLocation);

                int descriptionId = await new CollegeDescriptionRepository(context).Create(collegeData.CollegeDescription);

                int specialtyId;

                int college_SpecialtyId;

                foreach (Speсialty specialty in collegeData.SpeсialtyList)
                {
                    specialtyId = await new CollegeSpecialtyRepository(context).Create(specialty);

                    college_SpecialtyId = await new College_SpecialtyRepository(context).Create(College_Specialty.Create(1, collegeId, specialtyId).Value);

                }

            }

            return collegeData.CollegeHeader.CollegeId;
        }

        public async Task<Result<int>> DeleteCollege(int collegeId)
        {
            using (var context = new DatabaseContext())
            {
                int deletedCollegeId = await new CollegeHeaderRepository(context).Delete(collegeId);

                int deletedDescriptionId = await new CollegeDescriptionRepository(context).Delete(collegeId);

                int deletedLocationId = await new CollegeLocationRepository(context).Delete(collegeId);

                var College_SpecialtyResultList = Result<CollegeData>.ResultListInit(await new College_SpecialtyRepository(context).Get());

                if (!College_SpecialtyResultList.IsSuccess)
                    return Result<int>.Failure(College_SpecialtyResultList.ErrorMessage);

                var deletedSpecialtiesIds = College_SpecialtyResultList.Value
                    .Where(a => a.CollegeId == collegeId)
                    .Select(b => b.SpecialtyId)
                    .ToList();

                int deletedCollege_Specialty = await new College_SpecialtyRepository(context).Delete(collegeId);

                int deletedSpecialty;

                foreach (int deletedSpecialtyId in deletedSpecialtiesIds)
                    deletedSpecialty = await new CollegeSpecialtyRepository(context).Delete(deletedSpecialtyId);
            }

            return Result<int>.Success(collegeId);
        }

        public async Task<Result<int>> UpdateCollege(int collegeId, CollegeData collegeData)
        {
            using (var context = new DatabaseContext())
            {
                int updatedCollegeId = await new CollegeHeaderRepository(context).Update(collegeData.CollegeHeader);

                int updatedDescriptionId = await new CollegeDescriptionRepository(context).Update(collegeData.CollegeDescription);

                int updatedLocationId = await new CollegeLocationRepository(context).Update(collegeData.CollegeLocation);

                int updatedSpecialtyId;

                foreach (var updatedSpecialty in collegeData.SpeсialtyList)
                    updatedSpecialtyId = await new CollegeSpecialtyRepository(context).Update(updatedSpecialty);
            }

            return Result<int>.Success(collegeId);
        }
    }
}