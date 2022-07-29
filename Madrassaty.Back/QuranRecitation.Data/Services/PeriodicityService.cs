using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class PeriodicityService : IPeriodicityService
    {
        private readonly IPeriodicityRepository _PeridocityRepo;

        public PeriodicityService(IPeriodicityRepository classroomRepo)
        {
            _PeridocityRepo = classroomRepo;
        }

        public IQueryable<SchoolYearPeriodicity> GetAll()
        {
            return _PeridocityRepo.GetAll();
        }

        public SchoolYearPeriodicity GetById(int id)
        {
            return _PeridocityRepo.GetById(id);
        }

        public SchoolYearPeriodicity Create(SchoolYearPeriodicity periodicity)
        {
            return _PeridocityRepo.Create(periodicity);
        }

        public void Update(SchoolYearPeriodicity periodicity)
        {
            _PeridocityRepo.Update(periodicity);
        }

        public void Delete(SchoolYearPeriodicity periodicity)
        {
            _PeridocityRepo.Delete(periodicity);
        }
    }

    public interface IPeriodicityService
    {
        IQueryable<SchoolYearPeriodicity> GetAll();
        SchoolYearPeriodicity GetById(int id);
        SchoolYearPeriodicity Create(SchoolYearPeriodicity periodicity);
        void Update(SchoolYearPeriodicity periodicity);
        void Delete(SchoolYearPeriodicity periodicity);
    }
}