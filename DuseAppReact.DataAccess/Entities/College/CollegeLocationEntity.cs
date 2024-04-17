using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.DataAccess.Entities.College
{
    [Table("CollegeLocation")]
    public class CollegeLocationEntity
    {
        public int CollegeId { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollegeLocationId { get; set; }

        public string Region { get; set; } = string.Empty;

        public double Lat { get; set; }

        public double Long { get; set; }

    }
}
