using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Models.College
{
    public class CollegeLocation
    {
        private CollegeLocation(int collegeId, int collegeLocationId, string region, double lat, double long_)
        {
            Region = region;
            CollegeId = collegeId;
            CollegeLocationId = collegeLocationId;
            Lat = lat;
            Long = long_;
        }


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollegeLocationId { get; }

        public int CollegeId { get; }

        public string Region { get; } = string.Empty;

        public double Lat { get; }

        public double Long { get; }


        public static Result<CollegeLocation> Create(int collegeId, int collegeLocationId, string region, double lat, double long_)
        {
            if (region.Length > 80)
                return Result<CollegeLocation>.Failure("Адрес не должен превышать 80 символов");

            return Result<CollegeLocation>.Success(
                new CollegeLocation(collegeId, collegeLocationId, region, lat, long_)
            );
        }
    }
}
