using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Linq;

using System.Threading.Tasks;

namespace QuranRecitation.Data.Services
{
    public class RecitationDisciplineLevelService : IRecitationDisciplineLevelService
    {
        private readonly IRecitationDisciplineLevelRepository _recitationDisciplineLevelRepo;

        public RecitationDisciplineLevelService(IRecitationDisciplineLevelRepository recitationDisciplineLevelRepo)
        {
            _recitationDisciplineLevelRepo = recitationDisciplineLevelRepo;
        }

        public IQueryable<RecitationDisciplineLevel> GetAll()
        {
            return _recitationDisciplineLevelRepo.GetAll();
        }

        public RecitationDisciplineLevel GetById(int id)
        {
            return _recitationDisciplineLevelRepo.GetById(id);
        }

        public RecitationDisciplineLevel Create(RecitationDisciplineLevel recitationDisciplineLevel)
        {
            return _recitationDisciplineLevelRepo.Create(recitationDisciplineLevel);
        }

        public void Update(RecitationDisciplineLevel recitationDisciplineLevel)
        {
            _recitationDisciplineLevelRepo.Update(recitationDisciplineLevel);
        }

        public void Delete(RecitationDisciplineLevel recitationDisciplineLevel)
        {
            _recitationDisciplineLevelRepo.Delete(recitationDisciplineLevel);
        }
        }

    public interface IRecitationDisciplineLevelService
    {
        IQueryable<RecitationDisciplineLevel> GetAll();
        RecitationDisciplineLevel GetById(int id);
        RecitationDisciplineLevel Create(RecitationDisciplineLevel recitationDisciplineLevel);
        void Update(RecitationDisciplineLevel recitationDisciplineLevel);
        void Delete(RecitationDisciplineLevel recitationDisciplineLevel);
    }
}