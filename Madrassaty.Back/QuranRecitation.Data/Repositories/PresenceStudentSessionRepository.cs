
using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class PresenceStudentSessionRepository : GenericRepository<PresenceStudentSession>, IPresenceStudentSessionRepository
    {
        public PresenceStudentSessionRepository(QuranRecitationDbContext context)
           : base(context)
        {

        }
    }
    public interface IPresenceStudentSessionRepository : IGenericRepository<PresenceStudentSession>
    {

    }
}

