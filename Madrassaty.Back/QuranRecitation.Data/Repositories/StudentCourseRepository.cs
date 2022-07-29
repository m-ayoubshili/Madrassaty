using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class StudentCourseRepository : GenericRepository<StudentCourse>, IStudentCourseRepository
    {
        public StudentCourseRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IStudentCourseRepository : IGenericRepository<StudentCourse>
    {

    }
}