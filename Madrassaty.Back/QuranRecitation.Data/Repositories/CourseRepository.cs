using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class CourseRepository : GenericRepository<Course>, ICourseRepository
    {
        public CourseRepository(QuranRecitationDbContext context)
            : base(context)
        {
            
        }
    }

    public interface ICourseRepository : IGenericRepository<Course>
    {

    }
}