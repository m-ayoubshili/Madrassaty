using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class MoutounRepository : GenericRepository<Moutoun>, IMoutounRepository
    {
        public MoutounRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IMoutounRepository : IGenericRepository<Moutoun>
    {

    }
}