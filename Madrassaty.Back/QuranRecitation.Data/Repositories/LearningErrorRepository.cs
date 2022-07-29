using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class LearningErrorRepository : GenericRepository<LearningError>, ILearningErrorRepository
    {
        public LearningErrorRepository(QuranRecitationDbContext context)
          : base(context)
        {

        }

    }
    public interface ILearningErrorRepository : IGenericRepository<LearningError>
    {

    }
}