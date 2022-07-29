using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;

namespace QuranRecitation.WebApi.Controllers
{
    [RoutePrefix("api/AnneeScolaires")]
    public class AnneeScolairesController : ApiController
    {
        private readonly IAnneeScolaireService _anneeScolairesService;

        public AnneeScolairesController(IAnneeScolaireService anneeScolairesService)
        {
            _anneeScolairesService = anneeScolairesService;
        }

        // GET: api/AnneeScolaires
        public IQueryable<AnneeScolaire> GetAnneeScolaire()
        {
            return _anneeScolairesService.GetAll().ToList().AsQueryable();
        }

        // GET: api/AnneeScolaires/5
        [ResponseType(typeof(AnneeScolaire))]
        public HttpResponseMessage GetAnneeScolaire(int id)
        {
            AnneeScolaire anneeScolaire = _anneeScolairesService.GetById(id);
            if (anneeScolaire != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, anneeScolaire);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        [Route("Actif")]
        [ResponseType(typeof(AnneeScolaire))]
        public AnneeScolaire GetActifAnneeScolaire()
        {
            return _anneeScolairesService.GetAll().Where(x => x.Actif == true).FirstOrDefault();
        }
        // POST: api/AnneeScolaires
        [ResponseType(typeof(AnneeScolaire))]
        public HttpResponseMessage PostAnneeScolaire(AnneeScolaire model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                var tmpAnnee = _anneeScolairesService.GetAll().Where(a => a.Actif).FirstOrDefault(); 
                if ( tmpAnnee == null)
                {
                    model.Actif = true;
                }

                _anneeScolairesService.Create(model);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = model.Id }));
            return response;
        }

        [ResponseType(typeof(AnneeScolaire))]
        public HttpResponseMessage PutAnneeScolaire(int id, AnneeScolaire anneeScolaire)
        {
            if (ModelState.IsValid && id == anneeScolaire.Id)
            {
                try
                {
                    anneeScolaire.Id = id;
                    _anneeScolairesService.Update(anneeScolaire);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, anneeScolaire);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [Route("UpdateActif")]
        public IQueryable<AnneeScolaire> PutAnneeScolaireActif(int id)
        {
            try
            {
                var oldAnneeScolaire = _anneeScolairesService.GetAll().Where(x => x.Actif == true).FirstOrDefault();
                oldAnneeScolaire.Actif = false;
                _anneeScolairesService.Update(oldAnneeScolaire);

                var newAnneeScolaire = _anneeScolairesService.GetAll().Where(x => x.Id == id).FirstOrDefault();
                newAnneeScolaire.Actif = true;
                _anneeScolairesService.Update(newAnneeScolaire);

            }
            catch (Exception)
            {
                return null;
            }

            return _anneeScolairesService.GetAll().ToList().AsQueryable();

        }

        // DELETE: api/AnneeScolaires/5
        [ResponseType(typeof(AnneeScolaire))]
        public HttpResponseMessage DeleteAnneeScolaire(int id)
        {
            var anneeScolaire = _anneeScolairesService.GetById(id);

            if (anneeScolaire == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            if (anneeScolaire.Actif == true)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                _anneeScolairesService.Delete(anneeScolaire);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, anneeScolaire);
        }
    }
}