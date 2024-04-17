using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.DataAccess.Entities.College
{
    [Table("Specialty")]
    public class SpecialtyEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpecialtyId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string FinancialFoundation { get; set; } = string.Empty; // финансовая основа

        public double Cost { get; set; } = 0;

        public int FreePlaces { get; set; } = 0;

        public string EducationForm { get; set; } = string.Empty;

        public double PassingScore { get; set; } = 0;
    }
}
