using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Utils;
using System.Web.Http.Cors;
using QuranRecitation.WebApi.Models;
using System.Net.Http;
using System;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class RecurrencesController : ApiController
    {
        private readonly IRecurrenceService _recurrenceService;

        public RecurrencesController(IRecurrenceService recurrenceService)
        {
            _recurrenceService = recurrenceService;
        }

        // GET: api/Recurrences
        public IQueryable<RecurrenceModel> GetRecurrences()
        {
            var recurrences = _recurrenceService.GetAll().ToList();
            return recurrences.Select(x => new RecurrenceModel()
            {
                Id = x.Id,
                Wording = x.Wording,
                Description = x.Description
            }).AsQueryable();
        }
    }
}