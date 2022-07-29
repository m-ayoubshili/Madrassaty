using QuranRecitation.Data.Model;
namespace QuranRecitation.Data.Repositories
{
    public class AssiduiteRepository : GenericRepository<Assiduite>, IAssiduiteRepository
    {
        public AssiduiteRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IAssiduiteRepository : IGenericRepository<Assiduite>
    {

    }
}