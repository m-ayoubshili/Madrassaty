using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System.Linq;

namespace QuranRecitation.Data.Services
{
    public class MemberStatusService : IMemberStatusService
    {
        private readonly IMemberStatusRepository _memberStatusRepo;

        public MemberStatusService(IMemberStatusRepository memberStatusRepo)
        {
            _memberStatusRepo = memberStatusRepo;
        }

        public IQueryable<MemberStatus> GetAll()
        {
            return _memberStatusRepo.GetAll();
        }

        public MemberStatus GetById(int id)
        {
            return _memberStatusRepo.GetById(id);
        }

        public MemberStatus Create(MemberStatus memberStatus)
        {
            return _memberStatusRepo.Create(memberStatus);
        }

        public void Update(MemberStatus memberStatus)
        {
            _memberStatusRepo.Update(memberStatus);
        }

        public void Delete(MemberStatus memberStatus)
        {
            _memberStatusRepo.Delete(memberStatus);
        }
    }

    public interface IMemberStatusService
    {
        IQueryable<MemberStatus> GetAll();
        MemberStatus GetById(int id);
        MemberStatus Create(MemberStatus memberStatus);
        void Update(MemberStatus memberStatus);
        void Delete(MemberStatus memberStatus);
    }
}