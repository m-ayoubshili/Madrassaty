using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class MoutounSessionService : IMoutounSessionService
    {
        private readonly IMoutounSessionRepository _moutounSessionRepo;

        public MoutounSessionService(IMoutounSessionRepository moutounSessionRepo)
        {
            _moutounSessionRepo = moutounSessionRepo;
        }

        public IQueryable<MoutounSession> GetAll()
        {
            return _moutounSessionRepo.GetAll();
        }

        public MoutounSession GetById(int id)
        {
            return _moutounSessionRepo.GetById(id);
        }

        public MoutounSession Create(MoutounSession moutounSession)
        {
            return _moutounSessionRepo.Create(moutounSession);
        }

        public void Update(MoutounSession moutounSession)
        {
            _moutounSessionRepo.Update(moutounSession);
        }

        public void Delete(MoutounSession moutounSession)
        {
            _moutounSessionRepo.Delete(moutounSession);
        }
    }
    public interface IMoutounSessionService
    {
        IQueryable<MoutounSession> GetAll();
        MoutounSession GetById(int id);
        MoutounSession Create(MoutounSession moutounSession);
        void Update(MoutounSession moutounSession);
        void Delete(MoutounSession moutounSession);
    }
}