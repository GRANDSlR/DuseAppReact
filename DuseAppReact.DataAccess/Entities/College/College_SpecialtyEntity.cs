using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.DataAccess.Entities.College
{
    [Table("College_Specialty")]
    public class College_SpecialtyEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int College_SpecialtyId { get; set; }

        public int CollegeId { get; set; }

        public int SpecialtyId { get; set; }
    }
}
