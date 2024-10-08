﻿using DuseAppReact.Services.Services;

namespace DuseAppReact.Application.Interfaces.Repositoty
{
    public interface ICollegeRepositoryWithId<T> : IRepository<T>
    {
        Task<Result<T>> GetById(int id);
    }
}
