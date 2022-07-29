using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class RecurrenceRepository : GenericRepository<Recurrence>, IRecurrenceRepository
    {
        public RecurrenceRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IRecurrenceRepository : IGenericRepository<Recurrence>
    {

    }
}