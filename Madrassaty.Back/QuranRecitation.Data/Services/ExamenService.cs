using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class ExamenService : IExamenService
    {
        private readonly IExamenRepository _ExamenRepo;

        public ExamenService(IExamenRepository ExamenRepo)
        {
            _ExamenRepo = ExamenRepo;
        }

        public IQueryable<Examen> GetAll()
        {
            return _ExamenRepo.GetAll();
        }

        public Examen GetById(int id)
        {
            return _ExamenRepo.GetById(id);
        }

        public Examen Create(Examen Examen)
        {
            return _ExamenRepo.Create(Examen);
        }

        public void Update(Examen Examen)
        {
            _ExamenRepo.Update(Examen);
        }

        public void Delete(Examen Examen)
        {
            _ExamenRepo.Delete(Examen);
        }
    }

    public interface IExamenService
    {
        IQueryable<Examen> GetAll();
        Examen GetById(int id);
        Examen Create(Examen Examen);
        void Update(Examen Examen);
        void Delete(Examen Examen);
    }
}