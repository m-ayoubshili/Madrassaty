using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class PresencesService : IPresencesService
    {
        private readonly IPresencesRepository _PresencesRepo;

        public PresencesService(IPresencesRepository PresencesRepo)
        {
            _PresencesRepo = PresencesRepo;
        }

        public IQueryable<Presences> GetAll()
        {
            return _PresencesRepo.GetAll();
        }

        public Presences GetById(int id)
        {
            return _PresencesRepo.GetById(id);
        }

        public Presences Create(Presences Presences)
        {
            return _PresencesRepo.Create(Presences);
        }

        public void Update(Presences Presences)
        {
            _PresencesRepo.Update(Presences);
        }

        public void Delete(Presences Presences)
        {
            _PresencesRepo.Delete(Presences);
        }

        public bool? CheckStudentPresence(int courseId, Guid studentId)
        {
            var presence = _PresencesRepo.GetAll().Where(x => x.CourseId == courseId && x.StudentId == studentId).FirstOrDefault();
            if (presence == null)
                return null;
            else
                return presence.Present;
        }

    }

    public interface IPresencesService
    {
        IQueryable<Presences> GetAll();
        Presences GetById(int id);
        Presences Create(Presences Presences);
        void Update(Presences Presences);
        void Delete(Presences Presences);
        bool? CheckStudentPresence(int courseId, Guid studentId); 
    }
}