using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IDisciplineLevelRepository _disciplineLevelRepo;
        private readonly IClassroomRepository _classroomRepo;
        private readonly IMemberRepository _memberRepo;
        private readonly ISubjectRepository _subjectRepo;
        private readonly IDisciplineRepository _disciplineRepo;
        

        public CourseService(ICourseRepository courseRepo,
            IDisciplineLevelRepository disciplineLevelRepo,
            IClassroomRepository classroomRepo,
            IMemberRepository memberRepo,
            ISubjectRepository subjectRepo,
            IDisciplineRepository disciplineRepo)
        {
            _courseRepo = courseRepo;
            _disciplineLevelRepo = disciplineLevelRepo;
            _classroomRepo = classroomRepo;
            _memberRepo = memberRepo;
            _subjectRepo = subjectRepo;
            _disciplineRepo = disciplineRepo;
        }

        public IQueryable<Course> GetAll()
        {
            return _courseRepo.GetAll();
        }

        public Course GetById(int id)
        {
            return _courseRepo.GetById(id);
        }

        public Course Create(Course course)
        {
            course.DisciplineLevel = _disciplineLevelRepo.GetById(course.DisciplineLevelId);
            course.Classroom = _classroomRepo.GetById(course.ClassroomId);
            course.Teacher = _memberRepo.GetByIdGuid(course.TeacherId);

            return _courseRepo.Create(course);
        }

        public void Update(Course course)
        {
            course.DisciplineLevel = _disciplineLevelRepo.GetById(course.DisciplineLevelId);
            course.Classroom = _classroomRepo.GetById(course.ClassroomId);
            course.Teacher = _memberRepo.GetByIdGuid(course.TeacherId);


            _courseRepo.Update(course);
        }

        public void Delete(Course course)
        {
            _courseRepo.Delete(course);
        }
    }

    public interface ICourseService
    {
        IQueryable<Course> GetAll();
        Course GetById(int id);
        Course Create(Course course);
        void Update(Course course);
        void Delete(Course course);
    }
}