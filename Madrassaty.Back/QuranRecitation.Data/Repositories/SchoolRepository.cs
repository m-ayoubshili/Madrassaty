using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class SchoolRepository : GenericRepository<School>, ISchoolRepository
    {
        public SchoolRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface ISchoolRepository : IGenericRepository<School>
    {

    }
}