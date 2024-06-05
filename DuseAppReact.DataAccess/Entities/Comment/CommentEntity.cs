using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DuseAppReact.DataAccess.Entities.Comment
{
    [Table("Comment")]
    public class CommentEntity
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; } = string.Empty;
        public int Grade { get; set; }
        public DateTime DateOfCreation { get; set; }
    }
}
