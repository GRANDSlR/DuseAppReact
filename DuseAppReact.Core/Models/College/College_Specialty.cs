using DuseAppReact.Core.Models.College;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Mo.College
{
    public class College_Specialty
    {
        private College_Specialty(int college_SpecialtyId, int collegeId, int specialtyId)
        {
            College_SpecialtyId = college_SpecialtyId;
            CollegeId = collegeId;
            SpecialtyId = specialtyId;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int College_SpecialtyId { get; }

        public int CollegeId { get; }

        public int SpecialtyId { get; }

        public static Result<College_Specialty> Create(int college_SpecialtyId, int collegeId, int specialtyId)
        {
            return Result<College_Specialty>.Success(
                new College_Specialty(college_SpecialtyId, collegeId, specialtyId)
            );

        }
    }
}
