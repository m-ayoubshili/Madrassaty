using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class RecitationTajwidErrorService:IRecitationTajwidErrorService
    {
        private readonly IRecitationTajwidErrorRepository _recitationTajwidErrorRepo;

        public RecitationTajwidErrorService(IRecitationTajwidErrorRepository recitationTajwidErrorRepo)
        {
            _recitationTajwidErrorRepo = recitationTajwidErrorRepo;
        }

        public IQueryable<RecitationTajwidError> GetAll()
        {
            return _recitationTajwidErrorRepo.GetAll();
        }

        public RecitationTajwidError GetById(int id)
        {
            return _recitationTajwidErrorRepo.GetById(id);
        }

        public RecitationTajwidError Create(RecitationTajwidError recitationTajwidError)
        {
            return _recitationTajwidErrorRepo.Create(recitationTajwidError);
        }

        public void Update(RecitationTajwidError recitationTajwidError)
        {
            _recitationTajwidErrorRepo.Update(recitationTajwidError);
        }

        public void Delete(RecitationTajwidError recitationTajwidError)
        {
            _recitationTajwidErrorRepo.Delete(recitationTajwidError);
        }
    }
    public interface IRecitationTajwidErrorService
    {
        IQueryable<RecitationTajwidError> GetAll();
        RecitationTajwidError GetById(int id);
        RecitationTajwidError Create(RecitationTajwidError recitationTajwidError);
        void Update(RecitationTajwidError recitationTajwidError);
        void Delete(RecitationTajwidError recitationTajwidError);
    }
}