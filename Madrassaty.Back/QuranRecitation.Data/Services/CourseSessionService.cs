using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class CourseSessionService : ICourseSessionService
    {
        private readonly ICourseSessionRepository _courseSessionRepo;
        private readonly ICourseRepository _courseRepo;



        public CourseSessionService(ICourseSessionRepository courseSessionRepo, ICourseRepository courseRepo
            )
        {
            _courseSessionRepo = courseSessionRepo;
            _courseRepo = courseRepo;

        }

        public IQueryable<CourseSession> GetAll()
        {
            return _courseSessionRepo.GetAll();
        }

        public CourseSession GetById(int id)
        {
            return _courseSessionRepo.GetById(id);
        }

        public CourseSession Create(CourseSession courseSession)
        {

            courseSession.Course = _courseRepo.GetById(courseSession.CourseId);

            return _courseSessionRepo.Create(courseSession);
        }

        public void Update(CourseSession courseSession)
        {
            courseSession.Course = _courseRepo.GetById(courseSession.CourseId);


            _courseSessionRepo.Update(courseSession);
        }

        public void Delete(CourseSession courseSession)
        {
            _courseSessionRepo.Delete(courseSession);
        }
    }

    public interface ICourseSessionService
    {
        IQueryable<CourseSession> GetAll();
        CourseSession GetById(int id);
        CourseSession Create(CourseSession courseSession);
        void Update(CourseSession courseSession);
        void Delete(CourseSession courseSession);
    }
}