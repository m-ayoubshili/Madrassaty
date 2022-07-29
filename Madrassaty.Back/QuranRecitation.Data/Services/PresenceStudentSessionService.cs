using System;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class PresenceStudentSessionService : IPresenceStudentSessionService
    {
        private readonly IPresenceStudentSessionRepository _PresencesRepo;

        public PresenceStudentSessionService(IPresenceStudentSessionRepository PresencesRepo)
        {
            _PresencesRepo = PresencesRepo;
        }

        public IQueryable<PresenceStudentSession> GetAll()
        {
            return _PresencesRepo.GetAll();
        }

        public PresenceStudentSession GetById(int id)
        {
            return _PresencesRepo.GetById(id);
        }

        public PresenceStudentSession Create(PresenceStudentSession Presences)
        {
            return _PresencesRepo.Create(Presences);
        }

        public void Update(PresenceStudentSession Presences)
        {
            _PresencesRepo.Update(Presences);
        }

        public void Delete(PresenceStudentSession Presences)
        {
            _PresencesRepo.Delete(Presences);
        }

        public IQueryable<Member> GetStudentsBySession(int sessionId)
        {
            return _PresencesRepo.GetAll().Where(x => x.SessionId == sessionId).Select(x => x.Student);
        }

        public bool? CheckStudentPresence(int sessionId, Guid studentId)
        {
            var presence = _PresencesRepo.GetAll().Where(x => x.SessionId == sessionId && x.StudentId == studentId).FirstOrDefault();
            if (presence == null)
                return null;
            else
                return presence.Present;
        }

    }

    public interface IPresenceStudentSessionService
    {
        IQueryable<PresenceStudentSession> GetAll();
        PresenceStudentSession GetById(int id);
        bool? CheckStudentPresence(int sessionId, Guid studentId);
        PresenceStudentSession Create(PresenceStudentSession Presences);
        void Update(PresenceStudentSession Presences);
        void Delete(PresenceStudentSession Presences);
    }
}