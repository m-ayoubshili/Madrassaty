using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class SchoolService : ISchoolService
    {
        private readonly ISchoolRepository _schoolRepo;

        public SchoolService(ISchoolRepository schoolRepo)
        {
            _schoolRepo = schoolRepo;
        }

        public IQueryable<School> GetAll()
        {
            return _schoolRepo.GetAll();
        }

        public School GetById(int id)
        {
            return _schoolRepo.GetById(id);
        }

        public School GetDefaultSchool()
        {
            return GetAll().FirstOrDefault();
        }

        public void Update(School school)
        {
            _schoolRepo.Update(school);
        }

        public School Create(School school)
        {
            return _schoolRepo.Create(school);
        }

        public void Delete(School school)
        {
            _schoolRepo.Delete(school);
        }
    }

    public interface ISchoolService
    {
        IQueryable<School> GetAll();
        School GetById(int id);
        School GetDefaultSchool();
        void Update(School school);
        School Create(School school);
        void Delete(School school);
    }
}