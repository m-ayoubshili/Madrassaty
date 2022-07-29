using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class DisciplineLevelService : IDisciplineLevelService
    {

        private readonly IDisciplineLevelRepository _disciplineLevelRepo;
        private readonly IMemberRepository _memberRepo;
        private readonly IStudentDisciplineLevelRepository _studentDisciplineLevelRepo;

        public DisciplineLevelService(IDisciplineLevelRepository _disciplineLevelRepo, IMemberRepository memberRepo, IStudentDisciplineLevelRepository studentDisciplineLevelRepo)
        {
            this._disciplineLevelRepo = _disciplineLevelRepo;
            this._memberRepo = memberRepo;
            this._studentDisciplineLevelRepo = studentDisciplineLevelRepo;
        }

        public IQueryable<DisciplineLevel> GetAll()
        {
            return _disciplineLevelRepo.GetAll().ToList().AsQueryable();
        }

        public DisciplineLevel GetById(int id)
        {
            return _disciplineLevelRepo.GetById(id);
        }

        public DisciplineLevel Create(DisciplineLevel disciplineLevel)
        {
            return _disciplineLevelRepo.Create(disciplineLevel);
        }

        public void Update(DisciplineLevel disciplineLevel)
        {
            _disciplineLevelRepo.Update(disciplineLevel);
        }

        public void Delete(DisciplineLevel disciplineLevel)
        {
            _disciplineLevelRepo.Delete(disciplineLevel);
        }

        public IQueryable<DisciplineLevel> GetLevelsByDiscipline(int id)
        {
            return _disciplineLevelRepo.GetAll().Where(x => x.DisciplineId == id);
        }

        public IQueryable<Member> GetStudentsByCourse(int levelId, int DisciplineId)
        {
            return _studentDisciplineLevelRepo.GetAll().Where(x => x.DisciplineLevelId == levelId && x.DisciplineId == DisciplineId).Select(x=>x.Student);
        }


        public bool CheckStudentSameDisciplineExistence(int levelId, Guid studentId)
        {
            if (levelId == 0)
            {
                return false;
            }
            var level = GetById(levelId);
            var levelStudents = _studentDisciplineLevelRepo.GetAll();
            if (levelStudents.Where(x => x.StudentId.Equals(studentId) && x.DisciplineLevelId != levelId && x.DisciplineId == level.DisciplineId).Count() > 0)
                return true;
            else
                return false;
        }

        public bool CheckStudentExistence(int levelId, Guid studentId)
        {
            if (levelId == 0)
            {
                return false;
            }
            var level = GetById(levelId);
            var levelStudents = level.StudentDisciplineLevels.ToList();
            if (levelStudents.Where(x => x.StudentId.Equals(studentId)).Count() > 0)
                return true;
            else
                return false;
        }

        public void AssignLevelStudent(int levelId, Guid studentId)
        {
            var level = GetById(levelId);
            var studentLevel = _studentDisciplineLevelRepo.GetAll().Where(x =>
                x.StudentId.Equals(studentId) &&
                x.DisciplineId == level.DisciplineId &&
                x.DisciplineLevelId == levelId).FirstOrDefault();

            if (studentLevel == null)
            {
                level.StudentDisciplineLevels.Add(new StudentDisciplineLevel()
                {
                    DisciplineId = level.DisciplineId,
                    DisciplineLevelId = levelId,
                    StudentId = studentId
                });

                Update(level);
            }
        }

        public  void RemoveLevelStudent(int levelId, Guid studentId)
        {
            var level = GetById(levelId);
            var studentLevel = _studentDisciplineLevelRepo.GetAll().Where(x =>
                x.StudentId.Equals(studentId) &&
                x.DisciplineId == level.DisciplineId &&
                x.DisciplineLevelId == levelId).FirstOrDefault();

            if (studentLevel != null)
                _studentDisciplineLevelRepo.Delete(studentLevel);
        }
    }

    public interface IDisciplineLevelService
    {
        IQueryable<DisciplineLevel> GetAll();
        DisciplineLevel GetById(int id);
        DisciplineLevel Create(DisciplineLevel disciplineLevel);
        void Update(DisciplineLevel disciplineLevel);
        void Delete(DisciplineLevel disciplineLevel);
        IQueryable<DisciplineLevel> GetLevelsByDiscipline(int id);
        IQueryable<Member> GetStudentsByCourse(int levelId, int DisciplineId); 
        bool CheckStudentSameDisciplineExistence(int levelId, Guid studentId);
        bool CheckStudentExistence(int levelId, Guid studentId);
        void AssignLevelStudent(int levelId, Guid studentId);
        void RemoveLevelStudent(int levelId, Guid studentId);
    }
}