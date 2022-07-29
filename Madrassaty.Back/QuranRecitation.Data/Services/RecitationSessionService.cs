using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class RecitationSessionService : IRecitationSessionService
    {
        private readonly IRecitationSessionRepository _recitationSessionRepo;

        public RecitationSessionService(IRecitationSessionRepository recitationSessionRepo)
        {
            _recitationSessionRepo = recitationSessionRepo;
        }

        public IQueryable<RecitationSession> GetAll()
        {
            return _recitationSessionRepo.GetAll();
        }
        
        public RecitationSession GetById(int id)
        {
            return _recitationSessionRepo.GetById(id);
        }

        public RecitationSession Create(RecitationSession recitationSession)
        {
            return _recitationSessionRepo.Create(recitationSession);
        }

        public void Update(RecitationSession recitationSession)
        {
            _recitationSessionRepo.Update(recitationSession);
        }

        public void Delete(RecitationSession recitationSession)
        {
            _recitationSessionRepo.Delete(recitationSession);
        }
    }

    public interface IRecitationSessionService
    {
        RecitationSession GetById(int id);
        IQueryable<RecitationSession> GetAll();
        void Update(RecitationSession recitationSession);
        RecitationSession Create(RecitationSession recitationSession);
        void Delete(RecitationSession recitationSession);
    }
}