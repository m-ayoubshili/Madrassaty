using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class RecitationDetailService : IRecitationDetailService
    {
        private readonly IRecitationDetailRepository _recitationDetailRepo;

        public RecitationDetailService(IRecitationDetailRepository recitationDetailRepo)
        {
            _recitationDetailRepo = recitationDetailRepo;
        }
        public IQueryable<RecitationDetail> GetAll()
        {
            return _recitationDetailRepo.GetAll();
        }
        public RecitationDetail GetById(int id)
        {
            return _recitationDetailRepo.GetById(id);
        }

        public RecitationDetail Create(RecitationDetail recitationDetail)
        {
            return _recitationDetailRepo.Create(recitationDetail);
        }

        public void Update(RecitationDetail recitationDetail)
        {
            _recitationDetailRepo.Update(recitationDetail);
        }
        
        public void Delete(RecitationDetail recitationDetail)
        {
            _recitationDetailRepo.Delete(recitationDetail);
        }

    }
    public interface IRecitationDetailService
    {
        IQueryable<RecitationDetail> GetAll();
        RecitationDetail GetById(int id);
        RecitationDetail Create(RecitationDetail recitationDetail);
        void Update(RecitationDetail recitationDetail);
        void Delete(RecitationDetail recitationDetail);
    }
}