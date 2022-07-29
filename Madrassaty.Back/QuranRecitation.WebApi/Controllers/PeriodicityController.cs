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
using QuranRecitation.WebApi.Models;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class PeriodicityController : ApiController
    {
        private readonly IPeriodicityService _periodicityService;

        public PeriodicityController(IPeriodicityService periodicityService)
        {
            _periodicityService = periodicityService;
        }

        // GET: api/Periodicity
        public IQueryable<PeriodicityModel> GetPeriodicities()
        {
            var periodicities = _periodicityService.GetAll().ToList();
            return periodicities.Select(x => new PeriodicityModel()
            {
                Id = x.Id,
                SchoolYearId = x.SchoolYearId,
                Wording = x.Wording,
                StartDate = x.StartDate,
                EndDate = x.EndDate
            }).AsQueryable();

        }

        // GET: api/Periodicity/5
       
        public IQueryable<PeriodicityModel> GetPeriodicitiesBySchoolYearId(int id)
        {
            var levels = _periodicityService.GetAll().Where(x => x.SchoolYearId == id).ToList();
            return levels.Select(x => new PeriodicityModel()
            {
                Id = x.Id,
                SchoolYearId = x.SchoolYearId,
                Wording = x.Wording,
                StartDate = x.StartDate,
                EndDate = x.EndDate
            }).AsQueryable();

        }


        [HttpGet, Route("api/Periodicity/Actif")]
        [ResponseType(typeof(PeriodicityModel))]
        public List<PeriodicityModel> GetActifPeriodicities()
        {
            var levels = _periodicityService.GetAll().Where(x => x.SchoolYear.Actif == true).ToList();
            return levels.Select(x => new PeriodicityModel()
            {
                Id = x.Id,
                SchoolYearId = x.SchoolYearId,
                Wording = x.Wording,
                StartDate = x.StartDate,
                EndDate = x.EndDate
            }).ToList();
        }
        // PUT: api/Periodicity/5
        [ResponseType(typeof(PeriodicityModel))]
        public HttpResponseMessage PutPeriodicity(int id, PeriodicityModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var periodicity = new SchoolYearPeriodicity()
                    {
                        Id = model.Id,
                        Wording = model.Wording,
                        StartDate = model.StartDate,
                        EndDate = model.EndDate
                    };

                    _periodicityService.Update(periodicity);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Periodicity
        [ResponseType(typeof(PeriodicityModel))]
        public HttpResponseMessage PostPeriodicityModel(PeriodicityModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var periodicity = new SchoolYearPeriodicity()
                    {
                        SchoolYearId = model.SchoolYearId,
                        Wording = model.Wording,
                        StartDate = model.StartDate,
                        EndDate = model.EndDate
                    };
                    _periodicityService.Create(periodicity);

                    model = new PeriodicityModel()
                    {
                        Id = periodicity.Id,
                        SchoolYearId = periodicity.SchoolYearId,
                        Wording = periodicity.Wording,
                        StartDate = periodicity.StartDate,
                        EndDate = periodicity.EndDate
                    };
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = model.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/Periodicity/5
        [ResponseType(typeof(PeriodicityModel))]
        public HttpResponseMessage DeletePeriodicityModel(int id)
        {
            var periodicity = _periodicityService.GetById(id);

            if (periodicity == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            var model = new PeriodicityModel()
            {
                Id = periodicity.Id,
                SchoolYearId = periodicity.SchoolYearId,
                Wording = periodicity.Wording,
                StartDate = periodicity.StartDate,
                EndDate = periodicity.EndDate
            };

            try
            {
                _periodicityService.Delete(periodicity);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, model);
        }
    }


}