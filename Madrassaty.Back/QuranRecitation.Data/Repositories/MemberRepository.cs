using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class MemberRepository : GenericRepository<Member>, IMemberRepository
    {
        public MemberRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IMemberRepository : IGenericRepository<Member>
    {

    }
}