using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class MoutounSessionDetailRepository : GenericRepository<MoutounSessionDetail>, IMoutounSessionDetailRepository
    {
        public MoutounSessionDetailRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IMoutounSessionDetailRepository : IGenericRepository<MoutounSessionDetail>
    {

    }
}