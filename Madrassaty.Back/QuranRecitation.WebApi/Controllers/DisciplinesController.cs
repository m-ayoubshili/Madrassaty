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
    public class DisciplinesController : ApiController
    {
        private readonly IDisciplineService _disciplineService;

        public DisciplinesController(IDisciplineService disciplineService)
        {
            _disciplineService = disciplineService;
        }

        // GET: api/Disciplines
        public IQueryable<DisciplineModel> GetDisciplines()
        {
            var disciplines = _disciplineService.GetAll().ToList();
            return disciplines.Select(x => new DisciplineModel()
            {
                Id = x.Id,
                Wording = x.Wording,
                Description = x.Description,
                DisciplineLevels=x.DisciplineLevels,

                               
            }).AsQueryable();
        }

        // GET: api/Disciplines/5
        [ResponseType(typeof(DisciplineModel))]
        public HttpResponseMessage GetDiscipline(int id)
        {
            var discipline = _disciplineService.GetById(id);
            if (discipline != null)
            {
                var model = new DisciplineModel()
                {
                    Id = discipline.Id,
                    Wording = discipline.Wording,
                    Description = discipline.Description
                };
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/Disciplines/5
        [ResponseType(typeof(DisciplineModel))]
        public HttpResponseMessage PutDiscipline(int id, DisciplineModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var discipline = _disciplineService.GetById(id);
                    discipline.Wording = model.Wording;
                    discipline.Description = model.Description;
                    _disciplineService.Update(discipline);
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

        // POST: api/Disciplines
        [ResponseType(typeof(DisciplineModel))]
        public HttpResponseMessage PostDiscipline(DisciplineModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var discipline = new Discipline()
                    {
                        Wording = model.Wording,
                        Description = model.Description
                    };
                    _disciplineService.Create(discipline);

                    model = new DisciplineModel()
                    {
                        Id = discipline.Id,
                        Wording = discipline.Wording,
                        Description = discipline.Description,
                       
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

        // DELETE: api/Disciplines/5
        [ResponseType(typeof(DisciplineModel))]
        public HttpResponseMessage DeleteDiscipline(int id)
        {
            var discipline = _disciplineService.GetById(id);

            if (discipline == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            var model = new DisciplineModel()
            {
                Id = discipline.Id,
                Wording = discipline.Wording,
                Description = discipline.Description
            };

            try
            {
                _disciplineService.Delete(discipline);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, model);
        }
    }
}