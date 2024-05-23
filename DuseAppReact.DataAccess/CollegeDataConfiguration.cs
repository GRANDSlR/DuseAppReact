using DuseAppReact.Application.Interfaces.Configure;
using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Repositories.CollegeRep;
using DuseAppReact.Services.Services;

namespace DuseAppReact.DataAccess.Configurations.College
{
    public class CollegeDataConfiguration : ICollegeDataConfiguration
    {

        private readonly ICollegeRepositoryWithTitle<CollegeHeader> _collegeHeaderRepository;
        private readonly ICollegeRepositoryWithId<CollegeDescription> _collegeDescriptionRepository;
        private readonly ICollegeRepositoryWithId<CollegeLocation> _collegeLocationRepository;
        private readonly ICollegeRepositoryWithId<Speсialty> _speсialtyRepository;
        private readonly ICollegeRepositoryWithIdList<College_Specialty> _college_SpecialtyRepository;

        public CollegeDataConfiguration(
            ICollegeRepositoryWithTitle<CollegeHeader> collegeHeaderRepository,
            ICollegeRepositoryWithId<CollegeDescription> collegeDescriptionRepository,
            ICollegeRepositoryWithId<CollegeLocation> collegeLocationRepository,
            ICollegeRepositoryWithId<Speсialty> speсialtyRepository,
            ICollegeRepositoryWithIdList<College_Specialty> college_SpecialtyRepository)
        {
            _collegeHeaderRepository = collegeHeaderRepository;
            _collegeDescriptionRepository = collegeDescriptionRepository;
            _collegeLocationRepository = collegeLocationRepository;
            _speсialtyRepository = speсialtyRepository;
            _college_SpecialtyRepository = college_SpecialtyRepository;
        }

        public async Task<Result<List<Speсialty>>> GetAllSpecialties() 
            => Result<Speсialty>.ResultListInit(await _speсialtyRepository.Get());

        public async Task<Result<List<CollegeData>>> GetColleges(string title)
            => title == "" ? await GetAllColleges() : await GetCollegesByTitle(title);

        private async Task<Result<List<CollegeData>>> GetAllColleges()
        {
            
            var CollegeHeaderResultList = Result<CollegeData>.ResultListInit(await _collegeHeaderRepository.Get());

            if (!CollegeHeaderResultList.IsSuccess)
                return Result<List<CollegeData>>.Failure(CollegeHeaderResultList.ErrorMessage);

            var CollegeDescriptionResultList = Result<CollegeData>.ResultListInit(await _collegeDescriptionRepository.Get());

            if (!CollegeDescriptionResultList.IsSuccess)
                return Result<List<CollegeData>>.Failure(CollegeDescriptionResultList.ErrorMessage);

            var CollegeLocationResultList = Result<CollegeData>.ResultListInit(await _collegeLocationRepository.Get());

            if (!CollegeLocationResultList.IsSuccess)
                return Result<List<CollegeData>>.Failure(CollegeLocationResultList.ErrorMessage);

            var CollegeSpecialtyResultList = Result<CollegeData>.ResultListInit(await _speсialtyRepository.Get());

            if (!CollegeSpecialtyResultList.IsSuccess)
                return Result<List<CollegeData>>.Failure(CollegeSpecialtyResultList.ErrorMessage);

            var College_SpecialtyResultList = Result<CollegeData>.ResultListInit(await _college_SpecialtyRepository.Get());

            if (!College_SpecialtyResultList.IsSuccess)
                return Result<List<CollegeData>>.Failure(College_SpecialtyResultList.ErrorMessage);


            return Result<List<CollegeData>>.Success(
                GetCollegeDataList(
                    CollegeHeaderResultList.Value,
                    CollegeDescriptionResultList.Value,
                    CollegeLocationResultList.Value,
                    CollegeSpecialtyResultList.Value,
                    College_SpecialtyResultList.Value
                ));
            
        }

        private async Task<Result<List<CollegeData>>> GetCollegesByTitle(string title)
        {

            List<CollegeData> Colleges = new List<CollegeData>();
            
            var CollegeHeaderResultList = Result<CollegeData>.ResultListInit(await _collegeHeaderRepository.GetByTitle(title));

            if (!CollegeHeaderResultList.IsSuccess)
                return Result<List<CollegeData>>.Failure(CollegeHeaderResultList.ErrorMessage);

            foreach (var collegeHeader in CollegeHeaderResultList.Value)
            {
                var CollegeDescriptionResult = await _collegeDescriptionRepository.GetById(collegeHeader.CollegeId);

                if (!CollegeDescriptionResult.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeDescriptionResult.ErrorMessage);

                var CollegeLocationResult = await _collegeLocationRepository.GetById(collegeHeader.CollegeId);

                if (!CollegeLocationResult.IsSuccess)
                    return Result<List<CollegeData>>.Failure(CollegeLocationResult.ErrorMessage);

                List<Speсialty> SpeсialtyList = new List<Speсialty>();

                var College_SpecialtyIdList = await _college_SpecialtyRepository.GetById(collegeHeader.CollegeId);

                foreach(int College_SpecialtyId in College_SpecialtyIdList)
                {
                    var CollegeSpecialtyResult = await _speсialtyRepository.GetById(College_SpecialtyId);

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

            return Result<List<CollegeData>>.Success(Colleges);
        }

        private List<CollegeData> GetCollegeDataList(
            List<CollegeHeader> CollegeHeaderResultList,
            List<CollegeDescription> CollegeDescriptionResultList,
            List<CollegeLocation> CollegeLocationResultList,
            List<Speсialty> CollegeSpecialtyResultList,
            List<College_Specialty> College_SpecialtyResultList)
        {
            List<CollegeData> Colleges = new List<CollegeData>();

            foreach (CollegeHeader CurrCollegeHeaderObj in CollegeHeaderResultList)
            {
                var CurrSpecialtyIds = College_SpecialtyResultList
                    .Where(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId)
                    .Select(a => a.SpecialtyId)
                    .ToList();

                Colleges.Add(new CollegeData(

                    CollegeHeaderResultList.FirstOrDefault(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId),

                    CollegeDescriptionResultList.FirstOrDefault(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId),

                    CollegeLocationResultList.FirstOrDefault(a => a.CollegeId == CurrCollegeHeaderObj.CollegeId),

                    CollegeSpecialtyResultList
                        .Where(a => CurrSpecialtyIds
                        .Contains(a.SpecialtyId))
                        .ToList()
                ));
            }

            return Colleges;
        }

        public async Task<int> AddCollege(CollegeData collegeData)
        {
            int collegeId = await _collegeHeaderRepository.Create(collegeData.CollegeHeader);

            int locationId = await _collegeLocationRepository.Create(collegeData.CollegeLocation);

            int descriptionId = await _collegeDescriptionRepository.Create(collegeData.CollegeDescription);

            int specialtyId;

            int college_SpecialtyId;

            foreach (Speсialty specialty in collegeData.SpeсialtyList)
            {
                specialtyId = await _speсialtyRepository.Create(specialty);

                college_SpecialtyId = await _college_SpecialtyRepository.Create(College_Specialty.Create(1, collegeId, specialtyId).Value);
            }

            return collegeData.CollegeHeader.CollegeId;
        }

        public async Task<Result<int>> DeleteCollege(int collegeId)
        {
            int deletedCollegeId = await _collegeHeaderRepository.Delete(collegeId);

            int deletedDescriptionId = await _collegeDescriptionRepository.Delete(collegeId);

            int deletedLocationId = await _collegeLocationRepository.Delete(collegeId);

            var College_SpecialtyResultList = Result<CollegeData>.ResultListInit(await _college_SpecialtyRepository.Get());

            if (!College_SpecialtyResultList.IsSuccess)
                return Result<int>.Failure(College_SpecialtyResultList.ErrorMessage);

            var deletedSpecialtiesIds = College_SpecialtyResultList.Value
                .Where(a => a.CollegeId == collegeId)
                .Select(b => b.SpecialtyId)
                .ToList();

            int deletedCollege_Specialty = await _college_SpecialtyRepository.Delete(collegeId);

            int deletedSpecialty;

            foreach (int deletedSpecialtyId in deletedSpecialtiesIds)
                deletedSpecialty = await _speсialtyRepository.Delete(deletedSpecialtyId);

            return Result<int>.Success(collegeId);
        }

        public async Task<Result<int>> UpdateCollege(int collegeId, CollegeData collegeData)
        {
            
            int updatedCollegeId = await _collegeHeaderRepository.Update(collegeData.CollegeHeader);

            int updatedDescriptionId = await _collegeDescriptionRepository.Update(collegeData.CollegeDescription);

            int updatedLocationId = await _collegeLocationRepository.Update(collegeData.CollegeLocation);

            int updatedSpecialtyId;

            foreach (var updatedSpecialty in collegeData.SpeсialtyList)
                updatedSpecialtyId = await _speсialtyRepository.Update(updatedSpecialty);

            return Result<int>.Success(collegeId);
        }
    }
}