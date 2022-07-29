using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class StudentDisciplineLevelRepository : GenericRepository<StudentDisciplineLevel>, IStudentDisciplineLevelRepository
    {
        public StudentDisciplineLevelRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }

    public interface IStudentDisciplineLevelRepository : IGenericRepository<StudentDisciplineLevel>
    {

    }
}