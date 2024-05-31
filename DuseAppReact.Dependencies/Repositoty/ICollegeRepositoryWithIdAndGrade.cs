using DuseAppReact.Application.Interfaces.Repositoty;
using DuseAppReact.Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DuseAppReact.Dependencies.Repositoty
{
    public interface ICollegeRepositoryWithIdAndGrade<T> : ICollegeRepositoryWithId<T>
    {
        Task<int> UpdateGrade(int id, int grade);
    }
}
