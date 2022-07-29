using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace QuranRecitation.Data.Services
{
    public class MessageService: IMessageService
    {
        private readonly IMessageRepository _messageRepo;
        public MessageService(IMessageRepository messageRepo)
        {
            _messageRepo = messageRepo;
        }
        public async Task<Message> GetMessageById(int messageId)
        {
            return await _messageRepo.GetByIdAsync(messageId);
        }
        public IQueryable<Message> GetAllMessages()
        {
            return _messageRepo.GetAll();
        }
        public async Task<Message> CreateMessage(Message model)
        {
            return await _messageRepo.CreateAsync(model);
        }
        public async Task UpdateMessage(Message model)
        {
            await _messageRepo.UpdateAsync(model);
        }
        public IQueryable<Message> GetPrivateConversation(Guid firstUserId,Guid secondUserId)
        {
            return _messageRepo.GetAll()
                .Where(m => 
                (m.SenderId == firstUserId) && (m.ReceiverId == secondUserId.ToString()) 
                || 
                (m.SenderId == secondUserId) && (m.ReceiverId == firstUserId.ToString()));
        }
        public IQueryable<Message> GetGroupConversation(int groupId)
        {
            return _messageRepo.GetAll().Where(m =>
            m.ToGroup==true&& m.ReceiverId==groupId.ToString()
            );
        }
    }
    public interface IMessageService
    {
        Task<Message> GetMessageById(int messageId);
        IQueryable<Message> GetAllMessages();
        IQueryable<Message> GetPrivateConversation(Guid firstUser,Guid secondUser);
        IQueryable<Message> GetGroupConversation(int groupId);
        Task<Message> CreateMessage(Message message);
        Task UpdateMessage(Message message);
    }
}