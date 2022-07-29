using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class DisciplineLevelRepository : GenericRepository<DisciplineLevel>, IDisciplineLevelRepository
    {
        public DisciplineLevelRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IDisciplineLevelRepository : IGenericRepository<DisciplineLevel>
    {

    }
}