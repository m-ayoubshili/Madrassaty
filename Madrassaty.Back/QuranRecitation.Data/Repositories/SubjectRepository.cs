using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class SubjectRepository : GenericRepository<Subject>, ISubjectRepository
    { 
        public SubjectRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface ISubjectRepository : IGenericRepository<Subject>
    {

    }
}


