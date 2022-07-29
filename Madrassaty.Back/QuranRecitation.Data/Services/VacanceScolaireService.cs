using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class VacanceScolaireService : IVacanceScolaireService
    {
        private readonly IVacanceScolaireRepository _vacanceScolaireRepo;

        public VacanceScolaireService(IVacanceScolaireRepository vacanceScolaireRepo)
        {
            _vacanceScolaireRepo = vacanceScolaireRepo;
        }

        public IQueryable<VacanceScolaire> GetAll()
        {
            return _vacanceScolaireRepo.GetAll();
        }

        public VacanceScolaire GetById(int id)
        {
            return _vacanceScolaireRepo.GetById(id);
        }

        public VacanceScolaire Create(VacanceScolaire vacanceScolaire)
        {
            return _vacanceScolaireRepo.Create(vacanceScolaire);
        }

        public void Update(VacanceScolaire vacanceScolaire)
        {
            _vacanceScolaireRepo.Update(vacanceScolaire);
        }

        public void Delete(VacanceScolaire vacanceScolaire)
        {
            _vacanceScolaireRepo.Delete(vacanceScolaire);
        }
    }

    public interface IVacanceScolaireService
    {
        IQueryable<VacanceScolaire> GetAll();
        VacanceScolaire GetById(int id);
        VacanceScolaire Create(VacanceScolaire vacanceScolaire);
        void Update(VacanceScolaire vacanceScolaire);
        void Delete(VacanceScolaire vacanceScolaire);
    }
}