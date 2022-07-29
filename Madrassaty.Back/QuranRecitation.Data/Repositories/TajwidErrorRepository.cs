using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class TajwidErrorRepository : GenericRepository<TajwidError>, ITajwidErrorRepository
    {
        public TajwidErrorRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface ITajwidErrorRepository : IGenericRepository<TajwidError>
    {

    }
}