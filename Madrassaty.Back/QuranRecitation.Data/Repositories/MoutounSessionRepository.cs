using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class MoutounSessionRepository : GenericRepository<MoutounSession>, IMoutounSessionRepository
    {
        public MoutounSessionRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IMoutounSessionRepository : IGenericRepository<MoutounSession>
    {

    }
}