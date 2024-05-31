using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.DataAccess.Entities.College
{
    [Table("CollegeDescription")]
    public class CollegeDescriptionEntity
    {
        public int CollegeId { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollegeDescriptionId { get; set; }

        public string Description { get; set; } = string.Empty;

        public double Grade { get; set; } = 0;

        public string CollegeType { get; set; } = string.Empty;

        public string Ownership { get; set; } = string.Empty; // форма собственности

        public string WebSiteRef { get; set; } = string.Empty;


    }
}
