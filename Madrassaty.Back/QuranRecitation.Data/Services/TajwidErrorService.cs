using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class TajwidErrorService : ITajwidErrorService
    {
        private readonly ITajwidErrorRepository _tajwidErrorRepo;

        public TajwidErrorService(ITajwidErrorRepository tajwidErrorRepo)
        {
            _tajwidErrorRepo = tajwidErrorRepo;
        }

        public IQueryable<TajwidError> GetAll()
        {
            return _tajwidErrorRepo.GetAll();
        }

        public TajwidError GetById(int id)
        {
            return _tajwidErrorRepo.GetById(id);
        }

        public TajwidError Create(TajwidError tajwidError)
        {
            return _tajwidErrorRepo.Create(tajwidError);
        }

        public void Update(TajwidError tajwidError)
        {
            _tajwidErrorRepo.Update(tajwidError);
        }

        public void Delete(TajwidError tajwidError)
        {
            _tajwidErrorRepo.Delete(tajwidError);
        }
    }
    public interface ITajwidErrorService
    {
        IQueryable<TajwidError> GetAll();
        TajwidError GetById(int id);
        TajwidError Create(TajwidError tajwidError);
        void Update(TajwidError tajwidError);
        void Delete(TajwidError tajwidError);
    }
}