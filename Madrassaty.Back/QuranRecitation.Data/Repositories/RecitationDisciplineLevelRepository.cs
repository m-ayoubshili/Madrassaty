using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class RecitationDisciplineLevelRepository : GenericRepository<RecitationDisciplineLevel>, IRecitationDisciplineLevelRepository
    {
        public RecitationDisciplineLevelRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IRecitationDisciplineLevelRepository : IGenericRepository<RecitationDisciplineLevel>
    {

    }
}