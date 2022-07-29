using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class ExamenNotesRepository : GenericRepository<ExamenNotes>, IExamenNotesRepository
    {
        public ExamenNotesRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IExamenNotesRepository : IGenericRepository<ExamenNotes>
    {

    }
}