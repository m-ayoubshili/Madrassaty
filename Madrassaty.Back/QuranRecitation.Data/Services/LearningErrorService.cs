using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class LearningErrorService: ILearningErrorService
    {
        private readonly ILearningErrorRepository _learningErrorRepo;
        public LearningErrorService(ILearningErrorRepository learningErrorRepo)
        {
            _learningErrorRepo = learningErrorRepo;
        }

        public LearningError Create(LearningError LearningError)
        {
            return _learningErrorRepo.Create(LearningError);
        }

        public void Delete(LearningError LearningError)
        {
            _learningErrorRepo.Delete(LearningError);
        }

        public IQueryable<LearningError> GetAll()
        {
            return _learningErrorRepo.GetAll();
        }

        public LearningError GetById(int id)
        {
            return _learningErrorRepo.GetById(id);
        }

        public void Update(LearningError LearningError)
        {
            _learningErrorRepo.Update(LearningError);
        }
    }
    public interface ILearningErrorService
    {
        IQueryable<LearningError> GetAll();
        LearningError GetById(int id);
        LearningError Create(LearningError LearningError);
        void Update(LearningError LearningError);
        void Delete(LearningError LearningError);

    }
}