using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Linq;


namespace QuranRecitation.Data.Services
{
    public class AssiduiteService : IAssiduiteService
    {
        private readonly IAssiduiteRepository _AssiduiteRepo;

        public AssiduiteService(IAssiduiteRepository AssiduiteRepo)
        {
            _AssiduiteRepo = AssiduiteRepo;
        }

        public IQueryable<Assiduite> GetAll()
        {
            return _AssiduiteRepo.GetAll();
        }

        public Assiduite GetById(int id)
        {
            return _AssiduiteRepo.GetById(id);
        }

        public Assiduite Create(Assiduite Assiduite)
        {
            return _AssiduiteRepo.Create(Assiduite);
        }

        public void Update(Assiduite Assiduite)
        {
            _AssiduiteRepo.Update(Assiduite);
        }

        public void Delete(Assiduite Assiduite)
        {
            _AssiduiteRepo.Delete(Assiduite);
        }

        public bool? CheckStudentPresence(int courseId, Guid studentId)
        {
            var assiduite = _AssiduiteRepo.GetAll().Where(x => x.CourseSessionId == courseId && x.StudentId == studentId).FirstOrDefault();
            if (assiduite == null)
                return null;
            else
                return assiduite.Present;
        }

    }

    public interface IAssiduiteService
    {
        IQueryable<Assiduite> GetAll();
        Assiduite GetById(int id);
        Assiduite Create(Assiduite Assiduite);
        void Update(Assiduite Assiduite);
        void Delete(Assiduite Assiduite);
        bool? CheckStudentPresence(int courseId, Guid studentId);
    }

}