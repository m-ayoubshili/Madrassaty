using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class RecitationTajwidErrorRepository: GenericRepository<RecitationTajwidError>,IRecitationTajwidErrorRepository
    {
        public RecitationTajwidErrorRepository(QuranRecitationDbContext context)
           : base(context)
        {

        }
    }
    public interface IRecitationTajwidErrorRepository : IGenericRepository<RecitationTajwidError>
    {

    }
}