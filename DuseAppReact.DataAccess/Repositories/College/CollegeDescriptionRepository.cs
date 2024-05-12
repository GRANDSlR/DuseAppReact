using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.CollegeRep
{
    public class CollegeDescriptionRepository : ICollegeRepositoryWithId<CollegeDescription>
    {
        private readonly DatabaseContext _context;

        public CollegeDescriptionRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Result<CollegeDescription>> GetById(int id)
        {
            var CollegeDescriptionEntities = await _context.CollegeDescriptions
                .FirstOrDefaultAsync(a => a.CollegeId == id);

            var CollegeDescriptions = CollegeDescription.Create(
                    CollegeDescriptionEntities.CollegeId,
                    CollegeDescriptionEntities.CollegeDescriptionId,
                    CollegeDescriptionEntities.Description,
                    CollegeDescriptionEntities.Grade,
                    CollegeDescriptionEntities.CollegeType,
                    CollegeDescriptionEntities.Ownership,
                    CollegeDescriptionEntities.WebSiteRef);

            return CollegeDescriptions;
        }

        public async Task<List<Result<CollegeDescription>>> Get()
        {
            var CollegeDescriptionEntities = await _context.CollegeDescriptions
                .AsNoTracking()
                .ToListAsync();

            var CollegeDescriptions = CollegeDescriptionEntities
                .Select(a => CollegeDescription.Create(
                    a.CollegeId,
                    a.CollegeDescriptionId,
                    a.Description, 
                    a.Grade, 
                    a.CollegeType,
                    a.Ownership, 
                    a.WebSiteRef))
                .ToList();

            return CollegeDescriptions;
        }

        public async Task<int> Create(CollegeDescription college)
        {
            var CollegeDescriptionEntity = new CollegeDescriptionEntity
            {
                CollegeId=college.CollegeId,
                Description=college.Description,
                Grade=college.Grade,
                CollegeType=college.CollegeType.ToString(),
                Ownership=college.Ownership.ToString(),
                WebSiteRef=college.WebSiteRef
            };

            await _context.CollegeDescriptions.AddAsync(CollegeDescriptionEntity);
            await _context.SaveChangesAsync();

            return CollegeDescriptionEntity.CollegeDescriptionId;
        }

        public async Task<int> Update(CollegeDescription college)
        {
            await _context.CollegeDescriptions
                .Where(b => b.CollegeId == college.CollegeId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.CollegeId, b => college.CollegeId)
                    .SetProperty(b => b.CollegeDescriptionId, b => college.CollegeDescriptionId)
                    .SetProperty(b => b.Description, b => college.Description)
                    .SetProperty(b => b.Grade, b => college.Grade)
                    .SetProperty(b => b.CollegeType, b => college.CollegeType.ToString())
                    .SetProperty(b => b.Ownership, b => college.Ownership.ToString())
                    .SetProperty(b => b.WebSiteRef, b => college.WebSiteRef));


            return college.CollegeDescriptionId;
        }

        public async Task<int> Delete(int id)
        {
            await _context.CollegeDescriptions
                .Where(b => b.CollegeId == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
