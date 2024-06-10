using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.Dependencies.Repositoty;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.CollegeRep
{
    public class CollegeSpecialtyRepository : ICollegeRepositoryForSpecialty<Speсialty>
    {
        private readonly DatabaseContext _context;
        private readonly ICollegeRepositoryWithIdList<College_Specialty> _college_SpecialtyRepository;

        public CollegeSpecialtyRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Result<Speсialty>> GetById(int id)
        {
            var SpecialtyEntityEntities = await _context.Specialties
                .FirstOrDefaultAsync(a => a.SpecialtyId == id);

            var Specialties = Speсialty.Create(
                    SpecialtyEntityEntities.SpecialtyId,
                    SpecialtyEntityEntities.Title,
                    SpecialtyEntityEntities.Description,
                    SpecialtyEntityEntities.Cost,
                    SpecialtyEntityEntities.FreePlaces,
                    SpecialtyEntityEntities.EducationForm,
                    SpecialtyEntityEntities.PassingScore);

            return Specialties;
        }

        public async Task<List<Result<Speсialty>>> Get()
        {
            var SpecialtyEntityEntities = await _context.Specialties
                .AsNoTracking()
                .ToListAsync();

            var Specialties = SpecialtyEntityEntities
                .Select(a => Speсialty.Create(
                    a.SpecialtyId,
                    a.Title,
                    a.Description,
                    a.Cost,
                    a.FreePlaces,
                    a.EducationForm, 
                    a.PassingScore))
                .ToList();

            return Specialties;
        }

        public async Task<int> Create(Speсialty college)
        {
            var CollegeSpecialtyEntity = new SpecialtyEntity
            {
                Title=college.Title,
                Description = college.Description,
                Cost=college.Cost,
                FreePlaces=college.FreePlaces,
                EducationForm=college.EducationForm.ToString(),
                PassingScore=college.PassingScore
            };

            await _context.Specialties.AddAsync(CollegeSpecialtyEntity);
            await _context.SaveChangesAsync();

            return CollegeSpecialtyEntity.SpecialtyId;
        }

        public async Task<Result<int>> Update(Speсialty college, int collegeId)
        {
            if (await _context.Specialties.FirstOrDefaultAsync(a => a.SpecialtyId == college.SpecialtyId) != null)
            {
                await _context.Specialties
                    .Where(b => b.SpecialtyId == college.SpecialtyId)
                    .ExecuteUpdateAsync(s => s
                       .SetProperty(b => b.Title, b => college.Title)
                       .SetProperty(b => b.Description, b => college.Description)
                       .SetProperty(b => b.Cost, b => college.Cost)
                       .SetProperty(b => b.FreePlaces, b => college.FreePlaces)
                       .SetProperty(b => b.EducationForm, b => college.EducationForm.ToString())
                       .SetProperty(b => b.PassingScore, b => college.PassingScore));
            }
            else
            {
                return Result<int>.Failure("not found");
                /*int newSpecialtyId = await Create(college);
                return (await _college_SpecialtyRepository.Create(College_Specialty.Create(0, collegeId, newSpecialtyId).Value));
            */}

            return Result<int>.Success(college.SpecialtyId);
        }

        public async Task<int> Delete(int id)
        {
            await _context.Specialties
                .Where(b => b.SpecialtyId == id)
                .ExecuteDeleteAsync();

            return id;
        }

        public Task<int> Update(Speсialty parameter)
        {
            throw new NotImplementedException();
        }
    }
}
