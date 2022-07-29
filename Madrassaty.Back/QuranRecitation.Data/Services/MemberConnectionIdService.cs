using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System.Linq;
using System;

namespace QuranRecitation.Data.Services
{
    public class MemberConnectionIdService : IMemberConnectionIdService
    {
        private readonly IMemberConnectionIdRepository _MemberConnectionIdRepository;
        public MemberConnectionIdService(IMemberConnectionIdRepository memberConnectionIdRepository)
        {
            _MemberConnectionIdRepository = memberConnectionIdRepository;
        }
        public IQueryable<MemberConnectionId> GetAll()
        {
            return _MemberConnectionIdRepository.GetAll();
        }
        public MemberConnectionId GetByUserId(string UserId)
        {
            
            return _MemberConnectionIdRepository.GetAll().Where(x=>x.MemberId==UserId).FirstOrDefault();
        }
        public MemberConnectionId GetByConnId(string ConnId)
        {
            return _MemberConnectionIdRepository.GetAll().Where(x => x.ConnectionId == ConnId).FirstOrDefault();
        }
        public void Update(MemberConnectionId newMap)
        {
            var aux = GetByUserId(newMap.MemberId);
            aux.ConnectionId = newMap.ConnectionId;
            _MemberConnectionIdRepository.Update(aux);
        }
        public void Create (MemberConnectionId newMap)
        {
            _MemberConnectionIdRepository.Create(newMap);
        }
        public void DeleteByUserId(string UserId) 
        {
            MemberConnectionId MapToDelete = GetByUserId(UserId);
            _MemberConnectionIdRepository.Delete(MapToDelete);
        }
        public void DeleteByConnId(string ConnId)
        {
            MemberConnectionId MapToDelete = GetByConnId(ConnId);
            _MemberConnectionIdRepository.Delete(MapToDelete);
        }
    }
    public interface IMemberConnectionIdService
    {
        IQueryable<MemberConnectionId> GetAll();
        MemberConnectionId GetByUserId(string UserId);
        MemberConnectionId GetByConnId(string ConnId);
        void Update(MemberConnectionId newMap);
        void Create(MemberConnectionId newMap);
        void DeleteByUserId(string UserId);
        void DeleteByConnId(string ConnId);
    }
}