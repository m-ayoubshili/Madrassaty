using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    public class VacanceScolaireController : ApiController
    {
        private readonly IVacanceScolaireService _vacanceScolaireService;
        private readonly IAnneeScolaireService _anneeScolairesService;

        public VacanceScolaireController(IVacanceScolaireService vacanceScolaireService,
            IAnneeScolaireService anneeScolairesService)
        {
            _vacanceScolaireService = vacanceScolaireService;
            _anneeScolairesService = anneeScolairesService; 
        }

        // GET: api/AnneeScolaires
        public IQueryable<VacanceScolaire> GetVacanceScolaire()
        {
            var anneeScolaire = _anneeScolairesService.GetAll().Where(x => x.Actif == true).FirstOrDefault(); 
            return _vacanceScolaireService.GetAll().Where(x=> x.StartDay > anneeScolaire.StartDay && x.EndDay < anneeScolaire.EndDay).AsQueryable();
        }

        // GET: api/AnneeScolaires/5
        [ResponseType(typeof(VacanceScolaire))]
        public HttpResponseMessage GetVacanceScolaire(int id)
        {
            VacanceScolaire anneeScolaire = _vacanceScolaireService.GetById(id);
            if (anneeScolaire != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, anneeScolaire);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // POST: api/AnneeScolaires
        [ResponseType(typeof(VacanceScolaire))]
        public HttpResponseMessage PostVacanceScolaire(VacanceScolaire model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                _vacanceScolaireService.Create(model);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = model.Id }));
            return response;
        }

        [ResponseType(typeof(VacanceScolaire))]
        public HttpResponseMessage PutVacanceScolaire(int id, VacanceScolaire vacanceScolaire)
        {
            if (ModelState.IsValid && id == vacanceScolaire.Id)
            {
                try
                {
                    vacanceScolaire.Id = id;
                    _vacanceScolaireService.Update(vacanceScolaire);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, vacanceScolaire);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/AnneeScolaires/5
        [ResponseType(typeof(VacanceScolaire))]
        public HttpResponseMessage DeleteVacanceScolaire(int id)
        {
            var anneeScolaire = _vacanceScolaireService.GetById(id);

            if (anneeScolaire == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _vacanceScolaireService.Delete(anneeScolaire);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, anneeScolaire);
        }
    }
}
