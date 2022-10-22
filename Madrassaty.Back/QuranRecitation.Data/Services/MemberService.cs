using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuranRecitation.Data.Services
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepo;
        private readonly IMemberStatusRepository _memberStatusRepo;
        private readonly IMemberStatesRepository _memberStateRepo;

        public MemberService(IMemberRepository memberRepo, IMemberStatusRepository memberStatusRepo, IMemberStatesRepository memberStateRepo)
        {
            _memberRepo = memberRepo;
            _memberStatusRepo = memberStatusRepo;
            _memberStateRepo = memberStateRepo;
        }

        public IQueryable<Member> GetAll()
        {
            return _memberRepo.GetAll();
        }

        public Member GetById(Guid id)
        {
            return _memberRepo.GetByIdGuid(id);
        }

        public Member Create(Member member)
        {
            return _memberRepo.Create(member);
        }

        public Member CreateList(List<Member> Listmember)
        {
            return _memberRepo.CreateList(Listmember);
        }
        public void Update(Member member)
        {
            var memberStatus = _memberStatusRepo.GetById(member.MemberStatusId);
           var memberState = _memberStateRepo.GetById(member.MemberStateId);
            if (memberStatus != null && memberState != null)
                member.MemberStatus = memberStatus;
                member.MemberStates = memberState;
            _memberRepo.Update(member);
        }

        public void Delete(Member member)
        {
            _memberRepo.Delete(member);
        }

        public Member GetByLogin(string login)
        {
            return GetAll().FirstOrDefault(m => m.Login.Equals(login, StringComparison.CurrentCultureIgnoreCase));
        }

        public bool MemberExists(Guid id)
        {
            return GetAll().Count(m => m.Id == id) > 0;
        }

        public void SaveChanges()
        {
            _memberRepo.Save();
        }
        public List<string> GetBySchoolId(int schoolId)
        {
            var aux= GetAll().Where(m => m.SchoolId == schoolId &&m.MemberStatusId==1).Select(y=>y.Email).ToList();
            return aux;
        }
    }

    public interface IMemberService
    {
        IQueryable<Member> GetAll();
        Member GetById(Guid id);
        Member Create(Member member);
        void Update(Member member);
        void Delete(Member member);
        Member GetByLogin(string login);
        bool MemberExists(Guid id);
        void SaveChanges();
        List<string> GetBySchoolId(int schoolId);
        Member CreateList(List<Member> Listmember);
    }
}