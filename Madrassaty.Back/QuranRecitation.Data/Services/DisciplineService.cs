using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuranRecitation.Data.Services
{
    public class DisciplineService : IDisciplineService
    {
        private readonly IDisciplineRepository _disciplineRepo;

        public DisciplineService(IDisciplineRepository disciplineRepo)
        {
            _disciplineRepo = disciplineRepo;
        }

        public IQueryable<Discipline> GetAll()
        {
            return _disciplineRepo.GetAll();
        }

        public Discipline GetById(int id)
        {
            return _disciplineRepo.GetById(id);
        }

        public Discipline Create(Discipline discipline)
        {
            return _disciplineRepo.Create(discipline);
        }

        public void Update(Discipline discipline)
        {
            _disciplineRepo.Update(discipline);
        }

        public void Delete(Discipline discipline)
        {
            _disciplineRepo.Delete(discipline);
        }
    }

    public interface IDisciplineService
    {
        IQueryable<Discipline> GetAll();
        Discipline GetById(int id);
        Discipline Create(Discipline discipline);
        void Update(Discipline discipline);
        void Delete(Discipline discipline);
    }
}