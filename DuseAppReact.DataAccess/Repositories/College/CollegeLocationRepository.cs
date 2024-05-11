using DuseAppReact.Core.Dependencies;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.CollegeRep
{
    public class CollegeLocationRepository : ICollegeRepository<CollegeLocation>
    {
        private readonly DatabaseContext _context;

        public CollegeLocationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Result<CollegeLocation>> GetById(int id)
        {
            var collegeLocationEntities = await _context.CollegeLocations
                .FirstOrDefaultAsync(a => a.CollegeId == id);

            var collegeLocations = CollegeLocation.Create(
                collegeLocationEntities.CollegeId,
                collegeLocationEntities.CollegeLocationId,
                collegeLocationEntities.Region,
                collegeLocationEntities.Lat,
                collegeLocationEntities.Long);

            return collegeLocations;
        }

        public async Task<List<Result<CollegeLocation>>> Get()
        {
            var collegeLocationEntities = await _context.CollegeLocations
                .AsNoTracking()
                .ToListAsync();

            var collegeLocations = collegeLocationEntities
                .Select(a => CollegeLocation.Create(a.CollegeId, a.CollegeLocationId, a.Region, a.Lat, a.Long))
                .ToList();

            return collegeLocations;
        }

        public async Task<int> Create(CollegeLocation college)
        {
            var collegeLocationEntity = new CollegeLocationEntity
            {
                CollegeId = college.CollegeId,
                Region = college.Region,
                Lat = college.Lat,
                Long = college.Long
            };

            await _context.CollegeLocations.AddAsync(collegeLocationEntity);
            await _context.SaveChangesAsync();

            return collegeLocationEntity.CollegeLocationId;
        }

        public async Task<int> Update(CollegeLocation college)
        {
            await _context.CollegeLocations
                .Where(b => b.CollegeId == college.CollegeId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.CollegeId, b => college.CollegeId)
                    .SetProperty(b => b.CollegeLocationId, b => college.CollegeLocationId)
                    .SetProperty(b => b.Region, b => college.Region)
                    .SetProperty(b => b.Lat, b => college.Lat)
                    .SetProperty(b => b.Long, b => college.Long));

            return college.CollegeLocationId;
        }

        public async Task<int> Delete(int id)
        {
            await _context.CollegeLocations
                .Where(b => b.CollegeId == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
