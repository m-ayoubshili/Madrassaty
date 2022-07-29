using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace QuranRecitation.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T>, IGenericRepositoryAsync<T> where T : class
    {
        protected QuranRecitationDbContext DbContext { get; set; }
        protected DbSet<T> DbSet { get; set; }

        public GenericRepository(QuranRecitationDbContext dbContext)
        {
            DbContext = dbContext;
            DbSet = DbContext.Set<T>();
        }

        public IQueryable<T> GetAll()
        {
            return DbSet;
        }

        public T GetById(int id)
        {
            return DbSet.Find(id);
        }

        public T GetByIdGuid(Guid id)
        {
            return DbSet.Find(id);
        }

        public T Create(T entity)
        {
            T result = entity;
            DbEntityEntry<T> dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
                dbEntityEntry.State = EntityState.Added;
            else
                result = DbSet.Add(entity);
            Save();
            return result;
        }

        public void Update(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
                DbSet.Attach(entity);
            dbEntityEntry.State = EntityState.Modified;
            Save();
        }

        public void Delete(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Deleted)
                dbEntityEntry.State = EntityState.Deleted;
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
            Save();
        }

        public void Save()
        {
            try
            {
                DbContext.SaveChanges();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception save changes", ex);
            }

        }

        public T CreateList(List<T> entity)
        {
            T result = entity.FirstOrDefault();
            try
            {
                foreach (var row in entity)
                {
                    result = DbSet.Add(row);
                    Save();
                }


            }
            catch (Exception ex)
            {
                //Log any exception here.
            }
            return result;
        }

        #region async

        public async Task<T> GetByIdAsync(int id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task<T> CreateAsync(T entity)
        {
            T result = entity;
            DbEntityEntry<T> dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
                dbEntityEntry.State = EntityState.Added;
            else
                result = DbSet.Add(entity);
            await SaveAsync();
            return result;
        }

        public async Task<T> GetByIdGuidAsync(Guid id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task UpdateAsync(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
                DbSet.Attach(entity);
            dbEntityEntry.State = EntityState.Modified;
            await SaveAsync();
        }

        public async Task DeleteAsync(T entity)
        {

            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Deleted)
                dbEntityEntry.State = EntityState.Deleted;
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            try
            {
                await DbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception save changes", ex);
            }
        }

        #endregion
    }


    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        T Create(T entity);
        T GetByIdGuid(Guid id);
        void Update(T entity);
        void Delete(T entity);
        void Save();
        T CreateList(List<T> entity);
    }

    public interface IGenericRepositoryAsync<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<T> CreateAsync(T entity);
        Task<T> GetByIdGuidAsync(Guid id);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task SaveAsync();
    }
}