using QuranRecitation.Data.Model;

namespace QuranRecitation.Data.Repositories
{
    public class StudentRecitationRepository : GenericRepository<StudentRecitation>, IStudentRecitationRepository
    {
        public StudentRecitationRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IStudentRecitationRepository : IGenericRepository<StudentRecitation>
    {

    }
}