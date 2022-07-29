using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;

namespace QuranRecitation.WebApi.Controllers
{
    [RoutePrefix("api/MessageGroup")]
    public class MessageGroupController : ApiController
    {
        private readonly IMessageGroupService _messageGroupService;
        private readonly IMemberService _memberService;
        public MessageGroupController(IMessageGroupService messageGroupService, IMemberService memberService)
        {
            _messageGroupService = messageGroupService;
            _memberService = memberService;
        }
        [HttpGet,Route("Groups")]
        public IQueryable<MessageGroup> GetGroups()
        {
            var groups = _messageGroupService.GetAll().ToList().AsQueryable();
            return groups ;
        }
        [Route("Groups/{groupId}"),ResponseType(typeof(MessageGroup))]
        public HttpResponseMessage DeleteGroup(int groupId)
        {
            var group = _messageGroupService.GetGroupById(groupId);
            if (group == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _messageGroupService.DeleteGroup(group);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, group);

        }
        [HttpGet, Route("Groups/User/{userId}")]
        public HttpResponseMessage GetGroupsByUserId(Guid userId)
        {
            var user = _memberService.GetById(userId);
            IQueryable<MessageGroup> groups;
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            try
            {
                groups = _messageGroupService.GetAllByUser(user).ToList().AsQueryable();
                return Request.CreateResponse(HttpStatusCode.OK, groups);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
        [Route("Groups/{groupId}")]
        public HttpResponseMessage GetGroupById(int groupId)
        {
            var group = _messageGroupService.GetGroupById(groupId);
            if (group == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, group);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
        [ResponseType(typeof(MessageGroup))]
        public HttpResponseMessage PostMessageGroup(MessageGroup model)
        {
            var m = _messageGroupService.GetAll().ToList().Contains(model);
            if (m)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            else
            {
                try
                {
                    _messageGroupService.CreateGroup(model);
                    return Request.CreateResponse(HttpStatusCode.OK,model);
                }
                catch
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
        }
        [Route("Groups")]
        public HttpResponseMessage AddUserToGroup(int groupId , Guid userId)
        {
            var group = _messageGroupService.GetGroupById(groupId);
            var user = _memberService.GetById(userId);
            if(group==null || user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    _messageGroupService.AddUserToGroup(groupId, user);
                    return Request.CreateResponse(HttpStatusCode.OK,group);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
        }
        [Route("Groups")]
        public HttpResponseMessage DeleteUserFromGroup(int groupId,Guid userId)
        {
            var group = _messageGroupService.GetGroupById(groupId);
            var user = _memberService.GetById(userId);
            var memberMessageGroup = new MemberMessageGroup();
            memberMessageGroup.MemberId = userId;
            memberMessageGroup.MessageGroupId = groupId;
            memberMessageGroup.Member = user;
            //memberMessageGroup.MessageGroup = group;
            var exist = group.MemberMessageGroup.ToList().Contains(memberMessageGroup);
            if (group == null || user == null )
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    _messageGroupService.RemoveUserFromGroup(groupId, user);
                    return Request.CreateResponse(HttpStatusCode.OK,group);
                }
                catch (Exception e)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
        }
        [Route("Groups/{groupId}/Members")]
        public HttpResponseMessage GetGroupMembers(int groupId)
        {
            List<Member> members=new List<Member>();
            var group = _messageGroupService.GetGroupById(groupId);
            if (group == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    
                    var membersId=_messageGroupService.GetGroupMembers(groupId);
                    foreach(Guid id in membersId)
                    {
                        members.Add(_memberService.GetById(id));
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, members.AsQueryable());
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            
        }
        public HttpResponseMessage PutMessageGroup(MessageGroup group)
        {
            MessageGroup groupToUpdate = _messageGroupService.GetGroupById(group.MessageGroupId);
            if (groupToUpdate == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    groupToUpdate.Name = group.Name;
                    _messageGroupService.UpdateGroup(groupToUpdate);
                    return Request.CreateResponse(HttpStatusCode.OK, groupToUpdate);
                }catch(Exception e)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
        }
    }
}