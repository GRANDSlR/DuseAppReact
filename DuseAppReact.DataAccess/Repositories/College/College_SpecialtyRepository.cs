using DuseAppReact.Core.Dependencies;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.Services.ResultService;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.CollegeRep
{
    public class College_SpecialtyRepository : ICollegeRepository<College_Specialty>
    {
        private readonly DatabaseContext _context;

        public College_SpecialtyRepository(DatabaseContext context)
        {
            _context = context;
        }
        
        public async Task<List<Result<College_Specialty>>> Get()
        {
            var College_SpecialtyEntities = await _context.College_Specialties
                .AsNoTracking()
                .ToListAsync();

            var College_Specialties = College_SpecialtyEntities
                .Select(a => College_Specialty.Create(a.College_SpecialtyId, a.CollegeId, a.SpecialtyId))
                .ToList();

            return College_Specialties;
        }

        public async Task<Result<College_Specialty>> GetById(int collegeId)
        {
            var College_SpecialtyEntity = await _context.College_Specialties
                .AsNoTracking()
                .SingleOrDefaultAsync(a =>a.CollegeId == collegeId);

            var College_Specialties = College_Specialty.Create(College_SpecialtyEntity.College_SpecialtyId, College_SpecialtyEntity.CollegeId, College_SpecialtyEntity.SpecialtyId);

            return College_Specialties;
        }

        public async Task<int> Create(College_Specialty college)
        {
            var College_SpecialtyEntity = new College_SpecialtyEntity
            {
                CollegeId = college.CollegeId,
                SpecialtyId = college.SpecialtyId
            };

            await _context.College_Specialties.AddAsync(College_SpecialtyEntity);
            await _context.SaveChangesAsync();

            return College_SpecialtyEntity.College_SpecialtyId;
        }

        public async Task<int> Update(College_Specialty college)
        {
            await _context.College_Specialties
                .Where(b => b.CollegeId == college.CollegeId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.College_SpecialtyId, b => college.College_SpecialtyId)
                    .SetProperty(b => b.CollegeId, b => college.CollegeId)
                    .SetProperty(b => b.SpecialtyId, b => college.SpecialtyId));

            return college.College_SpecialtyId;
        }

        public async Task<int> Delete(int id)
        {
            await _context.College_Specialties
                .Where(b => b.CollegeId == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
