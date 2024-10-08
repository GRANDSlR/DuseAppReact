﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;
using DuseAppReact.Services.Services;

namespace DuseAppReact.Core.Models.College
{

    public enum Ownership
    {
        Коммерческий,
        Государственный
    };

    public enum CollegeType
    {
        ПТУ,
        Колледж,
        Лицей
    };

    public class CollegeDescription
    {
        private CollegeDescription(int collegeId, int collegeDescriptionId, string description, double grade, CollegeType collegeType, Ownership ownership, string webSiteRef)
        {
            Description = description;
            Grade = grade;
            CollegeType = collegeType;
            Ownership = ownership;
            WebSiteRef = webSiteRef;
            CollegeId = collegeId;
            CollegeDescriptionId = collegeDescriptionId;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollegeDescriptionId { get; }

        public int CollegeId { get; }

        public string Description { get; } = string.Empty;

        public double Grade { get; } = 0;

        public CollegeType CollegeType { get; }

        public Ownership Ownership { get; } // форма собственности

        public string WebSiteRef { get; } = string.Empty;


        public static Result<CollegeDescription> Create(int collegeId, int collegeDescriptionId, string description, double grade, string collegeType, string ownership, string webSiteRef)
        {

            if (!Enum.TryParse(collegeType, out CollegeType collegeTypeEnum))
                return Result<CollegeDescription>.Failure($"Ошибка преобразования {collegeType} в CollegeType");

            if (!Enum.TryParse(ownership, out Ownership ownershipEnum))
                return Result<CollegeDescription>.Failure($"Ошибка преобразования {ownership} в Ownership");

            if (description.Length > 2000)
                return Result<CollegeDescription>.Failure("Описание не должно быть длиннее 2000 символов");

            if (webSiteRef.Length > 200)
                return Result<CollegeDescription>.Failure("Ссылка не должна быть длиннее 200 символов");

            if (grade < 0 || grade > 5)
                return Result<CollegeDescription>.Failure("Отметка не должна быть меньше 0 или больше 5");

            return Result<CollegeDescription>.Success(
                new CollegeDescription(collegeId, collegeDescriptionId, description, grade, collegeTypeEnum, ownershipEnum, webSiteRef)
            );

        }

    }
}
