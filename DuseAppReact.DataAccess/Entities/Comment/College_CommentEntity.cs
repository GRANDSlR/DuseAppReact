using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DuseAppReact.DataAccess.Entities.Comment
{
    [Table("College_Comment")]
    public class College_CommentEntity
    {
        [Key]
        public int Id { get; set; }
        public int CommentId { get; set; }
        public int CollegeId { get; set; }

    }
}
