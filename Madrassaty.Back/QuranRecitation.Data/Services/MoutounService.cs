using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class MoutounService : IMoutounService
    {
        private readonly IMoutounRepository _moutounRepo;

        public MoutounService(IMoutounRepository moutounRepo)
        {
            _moutounRepo = moutounRepo;
        }

        public IQueryable<Moutoun> GetAll()
        {
            return _moutounRepo.GetAll();
        }

        public Moutoun GetById(int id)
        {
            return _moutounRepo.GetById(id);
        }

        public Moutoun Create(Moutoun moutoun)
        {
            return _moutounRepo.Create(moutoun);
        }

        public void Update(Moutoun moutoun)
        {
            _moutounRepo.Update(moutoun);
        }

        public void Delete(Moutoun moutoun)
        {
            _moutounRepo.Delete(moutoun);
        }
    }
    public interface IMoutounService
    {
        IQueryable<Moutoun> GetAll();
        Moutoun GetById(int id);
        Moutoun Create(Moutoun moutoun);
        void Update(Moutoun moutoun);
        void Delete(Moutoun moutoun);
    }
}