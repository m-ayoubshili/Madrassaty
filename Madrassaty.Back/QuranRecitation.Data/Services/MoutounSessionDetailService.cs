using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class MoutounSessionDetailService : IMoutounSessionDetailService
    {
        private readonly IMoutounSessionDetailRepository _moutounSessionDetailRepo;

        public MoutounSessionDetailService(IMoutounSessionDetailRepository moutounSessionDetailRepo)
        {
            _moutounSessionDetailRepo = moutounSessionDetailRepo;
        }

        public IQueryable<MoutounSessionDetail> GetAll()
        {
            return _moutounSessionDetailRepo.GetAll();
        }

        public MoutounSessionDetail GetById(int id)
        {
            return _moutounSessionDetailRepo.GetById(id);
        }

        public MoutounSessionDetail Create(MoutounSessionDetail moutounSessionDetail)
        {
            return _moutounSessionDetailRepo.Create(moutounSessionDetail);
        }

        public void Update(MoutounSessionDetail moutounSessionDetail)
        {
            _moutounSessionDetailRepo.Update(moutounSessionDetail);
        }

        public void Delete(MoutounSessionDetail moutounSessionDetail)
        {
            _moutounSessionDetailRepo.Delete(moutounSessionDetail);
        }
    }
    public interface IMoutounSessionDetailService
    {
        IQueryable<MoutounSessionDetail> GetAll();
        MoutounSessionDetail GetById(int id);
        MoutounSessionDetail Create(MoutounSessionDetail moutounSessionDetail);
        void Update(MoutounSessionDetail moutounSessionDetail);
        void Delete(MoutounSessionDetail moutounSessionDetail);
    }
}