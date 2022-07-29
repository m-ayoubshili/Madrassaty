using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class PresencesRepository : GenericRepository<Presences>, IPresencesRepository
    {
        public PresencesRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IPresencesRepository : IGenericRepository<Presences>
    {

    }
}