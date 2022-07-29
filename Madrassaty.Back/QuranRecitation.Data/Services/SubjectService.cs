using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _subjectRepo;

        public SubjectService(ISubjectRepository subjectRepo)
        {
            _subjectRepo = subjectRepo;
        }

        public IQueryable<Subject> GetAll()
        {
            return _subjectRepo.GetAll();
        }

        public Subject GetById(int id)
        {
            return _subjectRepo.GetById(id);
        }

        public Subject Create(Subject subject)
        {
            return _subjectRepo.Create(subject);
        }

        public void Update(Subject subject)
        {
            _subjectRepo.Update(subject);
        }

        public void Delete(Subject subject)
        {
            _subjectRepo.Delete(subject);
        }
    }

    public interface ISubjectService
    {
        IQueryable<Subject> GetAll();
        Subject GetById(int id);
        Subject Create(Subject subject);
        void Update(Subject subject);
        void Delete(Subject subject);
    }
}
