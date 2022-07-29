using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class AnneeScolaireService : IAnneeScolaireService
    {
        private readonly IAnneeScolaireRepository _anneeScolaireRepo;

        public AnneeScolaireService(IAnneeScolaireRepository anneeScolaireRepo)
        {
            _anneeScolaireRepo = anneeScolaireRepo;
        }

        public IQueryable<AnneeScolaire> GetAll()
        {
            return _anneeScolaireRepo.GetAll();
        }

        public AnneeScolaire GetById(int id)
        {
            return _anneeScolaireRepo.GetById(id);
        }

        public AnneeScolaire Create(AnneeScolaire anneeScolaire)
        {
            return _anneeScolaireRepo.Create(anneeScolaire);
        }

        public void Update(AnneeScolaire anneeScolaire)
        {
            _anneeScolaireRepo.Update(anneeScolaire);
        }

        public void Delete(AnneeScolaire anneeScolaire)
        {
            _anneeScolaireRepo.Delete(anneeScolaire);
        }
    }

    public interface IAnneeScolaireService
    {
        IQueryable<AnneeScolaire> GetAll();
        AnneeScolaire GetById(int id);
        AnneeScolaire Create(AnneeScolaire anneeScolaire);
        void Update(AnneeScolaire anneeScolaire);
        void Delete(AnneeScolaire anneeScolaire);
    }
}