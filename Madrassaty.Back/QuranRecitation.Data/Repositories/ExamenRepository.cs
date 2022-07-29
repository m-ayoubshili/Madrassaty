using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class ExamenRepository : GenericRepository<Examen>, IExamenRepository
    {
        public ExamenRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IExamenRepository : IGenericRepository<Examen>
    {

    }
}