using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuranRecitation.Data.Services
{
    public class RecurrenceService : IRecurrenceService
    {
        private readonly IRecurrenceRepository _recurrenceRepo;

        public RecurrenceService(IRecurrenceRepository recurrenceRepo)
        {
            _recurrenceRepo = recurrenceRepo;
        }

        public IQueryable<Recurrence> GetAll()
        {
            return _recurrenceRepo.GetAll();
        }

    }

    public interface IRecurrenceService
    {
        IQueryable<Recurrence> GetAll();
    }
}