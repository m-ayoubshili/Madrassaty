using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Repositories
{
    public class VacanceScolaireRepository : GenericRepository<VacanceScolaire>, IVacanceScolaireRepository
    {
        public VacanceScolaireRepository(QuranRecitationDbContext context)
            : base(context)
        {

        }
    }
    public interface IVacanceScolaireRepository : IGenericRepository<VacanceScolaire>
    {

    }
}