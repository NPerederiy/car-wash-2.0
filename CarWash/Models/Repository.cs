using CarWash.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CarWash.Models
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext repositoryContext;

        public Repository(DbContext repositoryContext)
        {
            this.repositoryContext = repositoryContext;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await repositoryContext.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await repositoryContext.Set<T>().Where(expression).ToListAsync();
        }

        public async Task CreateAsync(T entity)
        {
            await repositoryContext.Set<T>().AddAsync(entity);
            await repositoryContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            repositoryContext.Set<T>().Update(entity);
            await repositoryContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            repositoryContext.Set<T>().Remove(entity);
            await repositoryContext.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await repositoryContext.SaveChangesAsync();
        }
    }
}