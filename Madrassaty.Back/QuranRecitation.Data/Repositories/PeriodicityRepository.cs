using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class PeriodicityRepository : GenericRepository<SchoolYearPeriodicity>, IPeriodicityRepository
    {
        public PeriodicityRepository(QuranRecitationDbContext context)
             : base(context)
        {

        }
    }
   
    public interface IPeriodicityRepository : IGenericRepository<SchoolYearPeriodicity>
    {

    }
}