using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Models.College
{

    public enum EducationForm
    {
        Дневная,
        Заочная
    };

    public class Speсialty
    {
        private const int TITLE_MAX_LENGTH = 100;
        private const int DESCRIPTION_MAX_LENGTH = 100;
        private Speсialty(int specialtyId, string title, string description, double cost, int freePlaces, EducationForm educationForm, double passingScore)
        {
            Title = title;
            Description = description;
            Cost = cost;
            FreePlaces = freePlaces;
            EducationForm = educationForm;
            PassingScore = passingScore;
            SpecialtyId = specialtyId;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpecialtyId { get; }

        public string Title { get; } = string.Empty;

        public string Description { get; } = string.Empty;

        public double Cost { get; } = 0;

        public int FreePlaces { get; } = 0;

        public EducationForm EducationForm { get; }

        public double PassingScore { get; } = 0;

        public static Result<Speсialty> Create(int specialtyId, string title, string description, double cost, int freePlaces, string educationForm, double passingScore)
        {

            if (!Enum.TryParse(educationForm, out EducationForm educationFormEnum))
                return Result<Speсialty>.Failure($"Ошибка преобразования {educationForm} в EducationForm");

            if (title.Length > TITLE_MAX_LENGTH)
                return Result<Speсialty>.Failure($"Название не должно превышать {TITLE_MAX_LENGTH} символов");

            if (description.Length > DESCRIPTION_MAX_LENGTH)
                return Result<Speсialty>.Failure($"Название не должно превышать {DESCRIPTION_MAX_LENGTH} символов");

            if (cost < 0)
                return Result<Speсialty>.Failure("Цена не должна быть отрицательной");

            if (freePlaces < 0)
                return Result<Speсialty>.Failure("Количество мест не должно быть отрицательным");

            if (passingScore < 0)
                return Result<Speсialty>.Failure("Проходной балл не должен быть отрицательным");


            return Result<Speсialty>.Success(
                new Speсialty(specialtyId, title, description, cost, freePlaces, educationFormEnum, passingScore)
            );
        }
    }
}
