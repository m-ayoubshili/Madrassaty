using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class MemberMessageGroupRepository : GenericRepository<MemberMessageGroup>, IMemberMessageGroupRepository
    {
        public MemberMessageGroupRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IMemberMessageGroupRepository : IGenericRepository<MemberMessageGroup>
    {

    }
}