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
using QuranRecitation.WebApi.Utils;
using QuranRecitation.WebApi.Models;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class DisciplineLevelsController : ApiController
    {
        private readonly IDisciplineLevelService _disciplineLevelService;

        public DisciplineLevelsController(IDisciplineLevelService disciplineLevelService)
        {
            _disciplineLevelService = disciplineLevelService;
        }

        // GET: api/DisciplineLevels
        public IQueryable<DisciplineLevelModel> GetDisciplineLevels()
        {
            var levels = _disciplineLevelService.GetAll().ToList();
            return levels.Select(x => new DisciplineLevelModel()
            {
                Id = x.Id,
                DisciplineId = x.DisciplineId,
                Wording = x.Wording,
                Description = x.Description,
            }).AsQueryable();
        }

        // GET: api/DisciplineLevels/5
        [HttpGet, Route("api/DisciplineLevels/{id:int}")]
        public IQueryable<DisciplineLevelModel> GetLevelsByDiscipline(int id)
        {
            var levels = _disciplineLevelService.GetAll().Where(x => x.DisciplineId == id).ToList();
            return levels.Select(x => new DisciplineLevelModel()
            {
                Id = x.Id,
                DisciplineId = x.DisciplineId,
                Wording = x.Wording,
                Description = x.Description,
            }).AsQueryable();
        }

        // POST: api/DisciplineLevels
        [ResponseType(typeof(DisciplineLevelModel))]
        public HttpResponseMessage PostDiscipline(DisciplineLevelModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var level = new DisciplineLevel()
                    {
                        DisciplineId = model.DisciplineId,
                        Wording = model.Wording,
                        Description = model.Description
                    };
                    _disciplineLevelService.Create(level);

                    model = new DisciplineLevelModel()
                    {
                        Id = level.Id,
                        DisciplineId = level.DisciplineId,
                        Wording = level.Wording,
                        Description = level.Description
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

        // PUT: api/DisciplineLevels
        [HttpPut, Route("api/DisciplineLevels/Students/{id:int}")]
        public HttpResponseMessage PutDiscipline(int id, List<MemberFilterModel> model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    foreach (var item in model)
                    {
                        if (item.IsSelected)
                        {
                            _disciplineLevelService.AssignLevelStudent(id, Guid.Parse(item.Id));
                        }
                        else
                        {
                            _disciplineLevelService.RemoveLevelStudent(id, Guid.Parse(item.Id));
                        }
                    }
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: api/DisciplineLevels/5
        [HttpPut, Route("api/DisciplineLevels/{id:int}")]
        [ResponseType(typeof(DisciplineLevelModel))]
        public HttpResponseMessage PutDisciplineLevel(int id, DisciplineLevelModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var disciplineLevel = new DisciplineLevel()
                    {
                        Id = model.Id,
                        DisciplineId = model.DisciplineId,
                        Wording = model.Wording,
                        Description = model.Description
                    };
                    _disciplineLevelService.Update(disciplineLevel);
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


        // DELETE: api/DisciplineLevels/5
        [ResponseType(typeof(DisciplineLevelModel))]
        [HttpDelete,Route("api/DisciplineLevels/{id:int}")]
        public HttpResponseMessage DeleteDisciplineLevel(int id)
        {
            var level = _disciplineLevelService.GetById(id);

            if (level == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            var model = new DisciplineLevelModel()
            {
                Id = level.Id,
                DisciplineId = level.DisciplineId,
                Wording = level.Wording,
                Description = level.Description
            };

            try
            {
                _disciplineLevelService.Delete(level);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, model);
        }
    }
}
