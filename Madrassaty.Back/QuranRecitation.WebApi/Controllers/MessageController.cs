using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using QuranRecitation.WebApi.Utils;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Threading.Tasks;
using System.Data.Entity;

namespace QuranRecitation.WebApi.Controllers
{
    [RoutePrefix("api/Messages")]
    public class MessageController : ApiController
    {
        private readonly IMessageService _messageService;
        private readonly IMemberService _memberService;
        private readonly IMessageGroupService _messageGroupService;

        public MessageController(IMessageService messageService, IMessageGroupService messageGroupService, IMemberService memberService)
        {
            _messageService = messageService;
            _memberService = memberService;
            _messageGroupService = messageGroupService;
        }
        [Route("Message/{messageId}")]
        public async Task<HttpResponseMessage> GetMessageById(int messageId)
        {
            var message = await _messageService.GetMessageById(messageId);

            if (message == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    return Request.CreateResponse(HttpStatusCode.OK, message);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
        }
        [Route("All")]
        public async Task<HttpResponseMessage> GetAllMessages()
        {
            var messageList = await _messageService.GetAllMessages().ToListAsync();
            return Request.CreateResponse(HttpStatusCode.OK, messageList);
        }
        [Route("PrivateConversation")]
        public async Task<HttpResponseMessage> GetPrivateConversation(Guid firstUserId, Guid secondUserId)
        {
            var firstUser = _memberService.GetById(firstUserId);
            var secondUser = _memberService.GetById(secondUserId);
            List<Message> conversationAuxiliare;
            ICollection<MessageModel> conversation = new HashSet<MessageModel>();

            if (firstUser == null || secondUser == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    conversationAuxiliare = await _messageService.GetPrivateConversation(firstUserId, secondUserId).ToListAsync();
                    foreach (Message message in conversationAuxiliare)
                    {
                        {
                            conversation.Add(EntityToModelMapping(message));
                        }
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, conversation);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
        }
        [Route("GroupConversation/{groupId}")]
        public HttpResponseMessage GetGroupConversation(int groupId)
        {
            var group = _messageGroupService.GetGroupById(groupId);
            IQueryable<Message> conversationAuxiliare;
            ICollection<MessageModel> conversation = new HashSet<MessageModel>();
            if (group == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    conversationAuxiliare = _messageService.GetGroupConversation(groupId).ToList().AsQueryable();
                    foreach (Message message in conversationAuxiliare)
                    {
                        {
                            conversation.Add(EntityToModelMapping(message));
                        }
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, conversation);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
        }
        [ResponseType(typeof(Message))]
        public HttpResponseMessage PostMessage([FromBody] MessageModelWithFile messageModelup)
        {
            var messageModel = messageModelup.message;
            var message = ModelToEntityMapping(messageModel);
            var existingMessage = _messageService.GetMessageById(messageModel.Id);
            if (existingMessage != null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                //try
                //{

                //    _messageService.CreateMessage(message);

                //    return Request.CreateResponse(HttpStatusCode.OK, message);
                //}
                //catch (Exception)
                //{
                //    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                //}
                try
                {
                    // put photo
                    if (!string.IsNullOrEmpty(messageModelup.PhotoBytes))
                    {
                        byte[] bytes = Convert.FromBase64String(messageModelup.PhotoBytes);
                        if (bytes != null && bytes.ToList().Count > 0)
                        {
                            _messageService.CreateMessage(message);
                            FileUtility.MessageSaveUploadedPhoto(bytes, messageModelup.message.SenderId.ToString() + messageModelup.message.ReceiverId.ToString()+messageModel.Date.ToString().Replace("/","").Replace(":",""));
                            message.PhotoPath = messageModelup.message.SenderId.ToString()+ messageModelup.message.ReceiverId.ToString() + messageModel.Date.ToString().Replace("/", "").Replace(":", "") + ".jpg";
                            _messageService.UpdateMessage(message);
                            return Request.CreateResponse(HttpStatusCode.OK,message);

                        }
                        else
                        {
                            return Request.CreateResponse(HttpStatusCode.NotFound);

                        }
                    }
                    else
                    {
                        _messageService.CreateMessage(message);
                        return Request.CreateResponse(HttpStatusCode.OK, message);

                        
                    }
            
                }

                catch (Exception e)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
        }


        #region Mapping
        [NonAction]
        private Message ModelToEntityMapping(MessageModel messageModel)
        {
            if (messageModel.Date == null) { messageModel.Date = DateTime.Now; }

         //   byte[] bytes = null;
          //  if (!string.IsNullOrEmpty(messageModel.PieceJointe))
            {
           //     bytes = Convert.FromBase64String(messageModel.PieceJointe);
            }

            return new Message()
            {
                Id = messageModel.Id,
                MessageBody = messageModel.MessageBody,
                ReceiverId = messageModel.ReceiverId,
                SenderId = new Guid(messageModel.SenderId),
                SendingDate = (DateTime)messageModel.Date,
                ToGroup = messageModel.ToGroup,
               // PieceJointe = bytes
                //Sender = _memberService.GetById(messageModel.SenderId)
            };
        }
        [NonAction]
        private MessageModel EntityToModelMapping(Message message)
        {
            return new MessageModel()
            {
                Id = message.Id,
                MessageBody = message.MessageBody,
                ReceiverId = message.ReceiverId,
                SenderId = message.SenderId.ToString(),
                ToGroup = message.ToGroup,
                Date = message.SendingDate,
                PhotoPath=message.PhotoPath,
            };
        }
        #endregion
    }
}