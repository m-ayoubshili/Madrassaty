using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class RecitationSessionRepository : GenericRepository<RecitationSession>, IRecitationSessionRepository
    {
        public RecitationSessionRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IRecitationSessionRepository : IGenericRepository<RecitationSession>
    {

    }
}