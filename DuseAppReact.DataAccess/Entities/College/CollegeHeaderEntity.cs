using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.DataAccess.Entities.College
{
    [Table("CollegeHeader")]
    public class CollegeHeaderEntity
    {
        [Key]
        public int CollegeId { get; set; }

        public string Title { get; set; } = string.Empty;

    }
}
