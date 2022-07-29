using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class MessageGroupService : IMessageGroupService
    {
        private readonly IMessageGroupRepository _messageGroupRepo;
        private readonly IMemberMessageGroupRepository _memberMessageGroupRepo;
        public MessageGroupService(IMessageGroupRepository messageGroupRepo,IMemberMessageGroupRepository memberMessageGroupRepo )
        {
            _messageGroupRepo = messageGroupRepo;
            _memberMessageGroupRepo = memberMessageGroupRepo;
        }
        public MessageGroup CreateGroup(MessageGroup messageGroup)
        {
            return _messageGroupRepo.Create(messageGroup);
        }
        public void DeleteGroup(MessageGroup messageGroup)
        {
            var ToDelete = _memberMessageGroupRepo.GetAll().Where(x => x.MessageGroupId == messageGroup.MessageGroupId);
            foreach(MemberMessageGroup mmg in ToDelete)
            {
                _memberMessageGroupRepo.Delete(mmg);
            }
            _messageGroupRepo.Delete(messageGroup);
        }
       public void AddUserToGroup(int groupId, Member user)
        {
           var memberMessageGroup = new MemberMessageGroup();
            memberMessageGroup.MemberId = user.Id;
            memberMessageGroup.MessageGroupId = groupId;
            _memberMessageGroupRepo.Create(memberMessageGroup);
        }
        public void RemoveUserFromGroup(int groupId, Member user)
        {
            var memberMessageGroup = new MemberMessageGroup();
            MemberMessageGroup test = _memberMessageGroupRepo.GetAll().First(x => x.MessageGroupId == groupId&&x.MemberId==user.Id);
            memberMessageGroup.MemberId = user.Id;
            memberMessageGroup.MessageGroupId = groupId;
            memberMessageGroup.MessageGroup = _messageGroupRepo.GetById(groupId);
            memberMessageGroup.Member = user;
            _memberMessageGroupRepo.Delete(test);
        }
        public MessageGroup GetGroupById(int id)
        {
            return _messageGroupRepo.GetById(id);
        }
        public IQueryable<MessageGroup> GetAll()
        {
            return _messageGroupRepo.GetAll();
        }
        public IQueryable<MessageGroup> GetAllByUser(Member user)
        {
            //var allGroups = _messageGroupRepo.GetAll();
            var messageGroups = _memberMessageGroupRepo.GetAll().Where<MemberMessageGroup>(x=>x.MemberId== user.Id);
            List<int> groups = new List<int>();
                foreach(MemberMessageGroup mmg in messageGroups) {
                groups.Add(mmg.MessageGroupId);
            }
            var userGroups = new HashSet<MessageGroup>();
            foreach(int id in groups)
            {
                userGroups.Add(_messageGroupRepo.GetById(id));
            }
           // allGroups = (IQueryable<MessageGroup>)userGroups;
            return userGroups.AsQueryable();
        }
        public List<Guid> GetGroupMembers(int groupId)
        {
            var memberMessageGroups = _memberMessageGroupRepo.GetAll().Where<MemberMessageGroup>(x => x.MessageGroupId == groupId);
            List<Guid> membersIds = new List<Guid>();
            foreach(MemberMessageGroup mmg in memberMessageGroups)
            {
                membersIds.Add(mmg.MemberId);
            }
            return membersIds;
        }
        public void UpdateGroup(MessageGroup group)
        {
            _messageGroupRepo.Update(group);
        }
            
    }
    public interface IMessageGroupService
    {
        MessageGroup CreateGroup(MessageGroup messageGroup);
        void DeleteGroup(MessageGroup messageGroup);
        void AddUserToGroup(int groupId, Member user);
        void RemoveUserFromGroup(int groupId, Member user);
        MessageGroup GetGroupById(int id);
        IQueryable<MessageGroup> GetAll();
        IQueryable<MessageGroup> GetAllByUser(Member user);
        List<Guid> GetGroupMembers(int groupId);
        void UpdateGroup(MessageGroup group);
    }
}