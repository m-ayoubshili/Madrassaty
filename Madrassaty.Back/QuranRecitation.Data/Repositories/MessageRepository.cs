using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        public MessageRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    
    public interface IMessageRepository: IGenericRepository<Message>, IGenericRepositoryAsync<Message>
    {

    }
}