using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;

namespace QuranRecitation.Data.Services
{
    public class MemberStatesService: IMemberStatesService
    {
        private readonly IMemberStatesRepository _memberStatesRepo;

        public MemberStatesService(IMemberStatesRepository memberStatesRepo)
        {
            _memberStatesRepo = memberStatesRepo;
        }

        public IQueryable<MemberStates> GetAll()
        {
            return _memberStatesRepo.GetAll();
        }

        public MemberStates GetById(int id)
        {
            return _memberStatesRepo.GetById(id);
        }

        public MemberStates Create(MemberStates memberStates)
        {
            return _memberStatesRepo.Create(memberStates);
        }

        public void Update(MemberStates memberStates)
        {
            _memberStatesRepo.Update(memberStates);
        }

        public void Delete(MemberStates memberStates)
        {
            _memberStatesRepo.Delete(memberStates);
        }
    }
    public interface IMemberStatesService
    {
        IQueryable<MemberStates> GetAll();
        MemberStates GetById(int id);
        MemberStates Create(MemberStates memberStates);
        void Update(MemberStates memberStates);
        void Delete(MemberStates memberStates);
    }
}