using DuseAppReact.Services.Services;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.Core.Models.Comment
{
    public class College_Comment
    {
        private College_Comment(int id, int commentId, int collegeId)
        {
            Id = id;
            CommentId = commentId;
            CollegeId = collegeId;
        }

        [Key]
        public int Id { get; set; }
        public int CommentId { get; private set; }
        public int CollegeId { get; private set; }

        public static Result<College_Comment> Create(int id, int commentId, int collegeId)
        {
            return Result<College_Comment>.Success(new College_Comment(id, commentId, collegeId));
        }
    }
}
