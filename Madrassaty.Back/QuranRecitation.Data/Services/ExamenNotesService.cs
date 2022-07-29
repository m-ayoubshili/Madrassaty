using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class ExamenNotesService : IExamenNotesService
    {
        private readonly IExamenNotesRepository _ExamenNotesRepo;

        public ExamenNotesService(IExamenNotesRepository ExamenNotesRepo)
        {
            _ExamenNotesRepo = ExamenNotesRepo;
        }

        public IQueryable<ExamenNotes> GetAll()
        {
            return _ExamenNotesRepo.GetAll();
        }

        public ExamenNotes GetById(int id)
        {
            return _ExamenNotesRepo.GetById(id);
        }

        public ExamenNotes Create(ExamenNotes ExamenNotes)
        {
            return _ExamenNotesRepo.Create(ExamenNotes);
        }

        public void Update(ExamenNotes ExamenNotes)
        {
            _ExamenNotesRepo.Update(ExamenNotes);
        }

        public void Delete(ExamenNotes ExamenNotes)
        {
            _ExamenNotesRepo.Delete(ExamenNotes);
        }
    }

    public interface IExamenNotesService
    {
        IQueryable<ExamenNotes> GetAll();
        ExamenNotes GetById(int id);
        ExamenNotes Create(ExamenNotes ExamenNotes);
        void Update(ExamenNotes ExamenNotes);
        void Delete(ExamenNotes ExamenNotes);
    }
}