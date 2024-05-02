using DuseAppReact.Core.Dependencies;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.Services.ResultService;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.CollegeRep
{
    public class CollegeSpecialtyRepository : ICollegeRepository<Speсialty>
    {
        private readonly DatabaseContext _context;

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
                    SpecialtyEntityEntities.FinancialFoundation,
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
                    a.FinancialFoundation,
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
                FinancialFoundation=college.FinancialFoundation.ToString(),
                Cost=college.Cost,
                FreePlaces=college.FreePlaces,
                EducationForm=college.EducationForm.ToString(),
                PassingScore=college.PassingScore
            };

            await _context.Specialties.AddAsync(CollegeSpecialtyEntity);
            await _context.SaveChangesAsync();

            return CollegeSpecialtyEntity.SpecialtyId;
        }

        public async Task<int> Update(Speсialty college)
        {
            await _context.Specialties
                .Where(b => b.SpecialtyId == college.SpecialtyId)
                .ExecuteUpdateAsync(s => s
                   .SetProperty(b => b.SpecialtyId, b => college.SpecialtyId)
                   .SetProperty(b => b.Title, b => college.Title)
                   .SetProperty(b => b.FinancialFoundation, b => college.FinancialFoundation.ToString())
                   .SetProperty(b => b.Cost, b => college.Cost)
                   .SetProperty(b => b.FreePlaces, b => college.FreePlaces)
                   .SetProperty(b => b.EducationForm, b => college.EducationForm.ToString())
                   .SetProperty(b => b.PassingScore, b => college.PassingScore));


            return college.SpecialtyId;
        }

        public async Task<int> Delete(int id)
        {
            await _context.Specialties
                .Where(b => b.SpecialtyId == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
