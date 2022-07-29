using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class PresencesController : ApiController
    {
        private readonly IPresencesService _presencesService;
        private readonly IDisciplineLevelService _disciplineLevelService;

        public PresencesController(IPresencesService presencesService,
                                    IDisciplineLevelService disciplineLevelService)
        {
            _presencesService = presencesService;
            _disciplineLevelService = disciplineLevelService;
        }

        public IQueryable<PresenceModels> GetPresences(int courseId, int levelId, int DisciplineId)
        {
            var members = _disciplineLevelService.GetStudentsByCourse(levelId, DisciplineId).ToList();

            return members.Select(m => new PresenceModels()
            {
                MemberId = m.Id.ToString(),
                FullName = m.FullName,
                Present = _presencesService.CheckStudentPresence(courseId, m.Id),
            }).ToList().AsQueryable();
        }

        // PUT: api/Presences
        [ResponseType(typeof(Presences))]
        public HttpResponseMessage PutPresences(Presences presences)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var existingPresence = _presencesService.GetAll().Where(x => x.CourseId == presences.CourseId && x.StudentId == presences.StudentId).FirstOrDefault();
                    if (existingPresence == null)
                        _presencesService.Create(presences);
                    else
                    {
                        existingPresence.Present = presences.Present;
                        _presencesService.Update(existingPresence);
                    }

                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Presences
        [ResponseType(typeof(Presences))]
        public HttpResponseMessage PostPresences(Presences model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _presencesService.Create(model);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Presences
        [ResponseType(typeof(PresenceModels))]
        public HttpResponseMessage PostPresences(int courseId, int disciplineId, int levelId, bool present)
        {
            try
            {
                var members = _disciplineLevelService.GetStudentsByCourse(levelId, disciplineId).ToList();
                var models = new List<PresenceModels>();

                foreach (var student in members)
                {
                    var existingPresence = _presencesService.GetAll().Where(x => x.CourseId == courseId && x.StudentId == student.Id).FirstOrDefault();
                    if (existingPresence == null)
                        _presencesService.Create(new Presences { CourseId = courseId , StudentId = student.Id ,Present = present });
                    else
                    {
                        existingPresence.Present = present;
                        _presencesService.Update(existingPresence);
                    }

                    models.Add(new PresenceModels
                    {
                        MemberId = student.Id.ToString(),
                        FullName = student.FullName,
                        Present = present
                    }); 
                }
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, models);
                return response;
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}
