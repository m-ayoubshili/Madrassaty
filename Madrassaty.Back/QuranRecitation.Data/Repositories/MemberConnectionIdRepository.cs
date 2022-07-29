using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class MemberConnectionIdRepository : GenericRepository<MemberConnectionId>, IMemberConnectionIdRepository
    {
        public MemberConnectionIdRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IMemberConnectionIdRepository : IGenericRepository<MemberConnectionId>
    {

    }
}