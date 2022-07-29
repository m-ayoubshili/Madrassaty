using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class MemberStatusRepository : GenericRepository<MemberStatus>, IMemberStatusRepository
    {
        public MemberStatusRepository(QuranRecitationDbContext context)
            : base(context)
        {
            
        }
    }

    public interface IMemberStatusRepository : IGenericRepository<MemberStatus>
    {

    }
}