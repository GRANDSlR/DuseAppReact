﻿using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Core.Mo.College;
using DuseAppReact.Core.Models.College;
using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.CollegeRep
{
    public class CollegeHeaderRepository : ICollegeRepositoryWithTitle<CollegeHeader>
    {
        private readonly DatabaseContext _context;

        public CollegeHeaderRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Result<CollegeHeader>>> GetByTitle(string title)
        {
            var collegeEntities = await _context.Colleges
                .Where(b => b.Title.Contains(title))
                .AsNoTracking()
                .ToListAsync();

            var colleges = collegeEntities
                .Select(a => CollegeHeader.Create(a.CollegeId, a.Title, a.Img))
                .ToList();

            return colleges;
        }

        public async Task<List<Result<CollegeHeader>>> Get()
        {
            var collegeEntities = await _context.Colleges
                .AsNoTracking()
                .ToListAsync();

            var colleges = collegeEntities
                .Select(a => CollegeHeader.Create(a.CollegeId, a.Title, a.Img))
                .ToList();

            return colleges;
        }

        public async Task<int> Create(CollegeHeader college)
        {
            var collegeEntity = new CollegeHeaderEntity
            {
                CollegeId = college.CollegeId,
                Title = college.Title,
                Img = college.Img
            };

            await _context.Colleges.AddAsync(collegeEntity);
            await _context.SaveChangesAsync();

            return collegeEntity.CollegeId;
        }

        public async Task<int> Update(CollegeHeader college)
        {
            await _context.Colleges
                .Where(b => b.CollegeId == college.CollegeId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.Title, b => college.Title)
                    .SetProperty(b => b.Img, b => college.Img));

            return college.CollegeId;
        }

        public async Task<int> Delete(int id)
        {
            await _context.Colleges
                .Where(b => b.CollegeId == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
