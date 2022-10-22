using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class MemberStatesRepository : GenericRepository<MemberStates>, IMemberStatesRepository
    {
        public MemberStatesRepository(QuranRecitationDbContext context)
          : base(context)
        {

        }
    }
    public interface IMemberStatesRepository : IGenericRepository<MemberStates>
    {

    }
}