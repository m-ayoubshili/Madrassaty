using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class StudentDisciplineLevelService : IStudentDisciplineLevelService
    {
        private readonly IStudentDisciplineLevelRepository _studentDisciplineLevelRepo;
        public StudentDisciplineLevelService(IStudentDisciplineLevelRepository studentDisciplineLevelRepo)
        {
            _studentDisciplineLevelRepo = studentDisciplineLevelRepo;
        }

        public IQueryable<StudentDisciplineLevel> GetAll()
        {
            return _studentDisciplineLevelRepo.GetAll();
        }


        public StudentDisciplineLevel Create(StudentDisciplineLevel studentDisciplineLevel)
        {
            return _studentDisciplineLevelRepo.Create(studentDisciplineLevel);
        }

    }

    public interface IStudentDisciplineLevelService
    {
        IQueryable<StudentDisciplineLevel> GetAll(); 
        StudentDisciplineLevel Create(StudentDisciplineLevel studentDisciplineLevel);
    }

}