using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class RecitationDetailRepository : GenericRepository<RecitationDetail>, IRecitationDetailRepository
    {
        public RecitationDetailRepository(QuranRecitationDbContext context)
               : base(context)
        {

        }
    }
    public interface IRecitationDetailRepository : IGenericRepository<RecitationDetail>
    {

    }
}