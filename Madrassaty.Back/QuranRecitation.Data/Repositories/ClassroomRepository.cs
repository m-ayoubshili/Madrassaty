using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class ClassroomRepository : GenericRepository<Classroom>, IClassroomRepository
    {
        public ClassroomRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IClassroomRepository : IGenericRepository<Classroom>
    {

    }
}