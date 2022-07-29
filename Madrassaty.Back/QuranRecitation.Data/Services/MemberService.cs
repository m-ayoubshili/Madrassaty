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

        public MemberService(IMemberRepository memberRepo, IMemberStatusRepository memberStatusRepo)
        {
            _memberRepo = memberRepo;
            _memberStatusRepo = memberStatusRepo;
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
            if (memberStatus != null)
                member.MemberStatus = memberStatus;
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