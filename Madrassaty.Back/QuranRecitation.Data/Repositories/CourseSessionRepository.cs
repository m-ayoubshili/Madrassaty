using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class CourseSessionRepository : GenericRepository<CourseSession>, ICourseSessionRepository
    {
        public CourseSessionRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface ICourseSessionRepository : IGenericRepository<CourseSession>
    {

    }
}