using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Models.College
{
    public class CollegeHeader
    {
        private const int TITLE_MAX_LENGTH = 100;

        private CollegeHeader(int id, string title, string img)
        {
            CollegeId = id;
            Title = title;
            Img = img;
        }

        [Key]
        public int CollegeId { get; }

        public string Title { get; } = string.Empty;

        public string Img { get; } = string.Empty;


        public static Result<CollegeHeader> Create(int id, string title, string img)
        {

            if (title.Length > TITLE_MAX_LENGTH)
                return Result<CollegeHeader>.Failure("Превышена максимальная длинна названия колледжа");

            return Result<CollegeHeader>.Success(
                new CollegeHeader(id, title, img)
            );

        }

    }
}
