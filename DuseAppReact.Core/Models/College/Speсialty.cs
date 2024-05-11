using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Models.College
{
    public enum FinancialFoundation
    {
        Коммерческая,
        Бютжетная
    };

    public enum EducationForm
    {
        Дневная,
        Заочная
    };

    public class Speсialty
    {
        private Speсialty(int specialtyId, string title, FinancialFoundation financialFoundation, double cost, int freePlaces, EducationForm educationForm, double passingScore)
        {
            Title = title;
            FinancialFoundation = financialFoundation;
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

        public FinancialFoundation FinancialFoundation { get; } // финансовая основа

        public double Cost { get; } = 0;

        public int FreePlaces { get; } = 0;

        public EducationForm EducationForm { get; }

        public double PassingScore { get; } = 0;

        public static Result<Speсialty> Create(int specialtyId, string title, string financialFoundation, double cost, int freePlaces, string educationForm, double passingScore)
        {
            if (!Enum.TryParse(financialFoundation, out FinancialFoundation financialFoundationEnum))
                return Result<Speсialty>.Failure($"Ошибка преобразования {financialFoundation} в CollegeType");

            if (!Enum.TryParse(educationForm, out EducationForm educationFormEnum))
                return Result<Speсialty>.Failure($"Ошибка преобразования {educationForm} в CollegeType");

            if (title.Length > 100)
                return Result<Speсialty>.Failure("Название не должно превышать 100 символов");

            if (cost < 0)
                return Result<Speсialty>.Failure("Цена не должна быть отрицательной");

            if (freePlaces < 0)
                return Result<Speсialty>.Failure("Количество мест не должно быть отрицательным");

            if (passingScore < 0)
                return Result<Speсialty>.Failure("Проходной балл не должен быть отрицательным");


            return Result<Speсialty>.Success(
                new Speсialty(specialtyId, title, financialFoundationEnum, cost, freePlaces, educationFormEnum, passingScore)
            );
        }
    }
}
