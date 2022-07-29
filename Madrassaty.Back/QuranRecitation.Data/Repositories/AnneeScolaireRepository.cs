using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class AnneeScolaireRepository : GenericRepository<AnneeScolaire>, IAnneeScolaireRepository
    {
        public AnneeScolaireRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IAnneeScolaireRepository : IGenericRepository<AnneeScolaire>
    {

    }

}