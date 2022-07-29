using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class MessageGroupRepository : GenericRepository<MessageGroup>, IMessageGroupRepository
    {
        public MessageGroupRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IMessageGroupRepository : IGenericRepository<MessageGroup>
    {

    }
}