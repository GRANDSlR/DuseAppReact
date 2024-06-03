using DuseAppReact.Core.Models.Comment;
using DuseAppReact.DataAccess.Entities.Comment;
using DuseAppReact.Dependencies.Repositoty;
using DuseAppReact.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess.Repositories.Comment
{
    public class CommentRepository : ICommentRepository<CommentModel>
    {
        private readonly DatabaseContext _context;

        public CommentRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<int> Create(CommentModel parameter, int collegeId)
        {
            var commentEntity = new CommentEntity
            {
                Id = parameter.Id,
                UserId  = parameter.UserId,
                Message = parameter.Message,
                DateOfCreation = parameter.DateOfCreation
            };

            await _context.Comments.AddAsync(commentEntity);
            await _context.College_Comment.AddAsync(
                new College_CommentEntity 
                { 
                    CommentId = commentEntity.Id, 
                    CollegeId = collegeId
                });
            await _context.SaveChangesAsync();

            return commentEntity.Id;
        }

        public async Task<int> Delete(int id)
        {
            await _context.Comments
                .Where(b => b.Id == id)
                .ExecuteDeleteAsync();

            await _context.College_Comment
                .Where(b => b.CommentId == id)
                .ExecuteDeleteAsync();

            return id;
        }

        public async Task<Result<List<CommentModel>>> GetByCollegeId(int collegeId)
        {

            List<int> commentIds = await _context.College_Comment
                .Where(a => a.CollegeId == collegeId)
                .Select(b => b.CommentId)
                .ToListAsync();

            if(commentIds.Count == 0)
                return Result<List<CommentModel>>.Success(null);

            var commentEntities = await _context.Comments
                .Where(b => commentIds.Contains(b.Id))
                .ToListAsync();

            if (commentEntities == null)
                return Result<List<CommentModel>>.Failure("Значение было null");

            var users = commentEntities
                .Select(a => CommentModel.Create(a.Id, a.UserId, a.Message, a.DateOfCreation))
                .ToList();

            var usersResultOfList = Result<CommentModel>.ResultListInit(users);

            return usersResultOfList;
        }

        public async Task<int> Update(CommentModel parameter)
        {
            await _context.Comments
                .Where(b => b.Id == parameter.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(b => b.Message, b => parameter.Message)
                    .SetProperty(b => b.DateOfCreation, b => parameter.DateOfCreation));

            return parameter.Id;
        }
    }
}
