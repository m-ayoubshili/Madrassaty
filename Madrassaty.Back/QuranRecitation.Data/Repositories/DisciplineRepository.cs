using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class DisciplineRepository : GenericRepository<Discipline>, IDisciplineRepository
    {
        public DisciplineRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IDisciplineRepository : IGenericRepository<Discipline>
    {

    }
}