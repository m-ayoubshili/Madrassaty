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
    public class AssiduiteController : ApiController
    {
        private readonly IAssiduiteService _AssiduiteService;
        private readonly IDisciplineLevelService _disciplineLevelService;

        public AssiduiteController(IAssiduiteService AssiduiteService,
                                    IDisciplineLevelService disciplineLevelService)
        {
            _AssiduiteService = AssiduiteService;
            _disciplineLevelService = disciplineLevelService;
        }

        public IQueryable<PresenceModels> GetAssiduite(int courseId, int levelId, int DisciplineId)
        {
            var members = _disciplineLevelService.GetStudentsByCourse(levelId, DisciplineId).ToList();

            return members.Select(m => new PresenceModels()
            {
                MemberId = m.Id.ToString(),
                FullName = m.FullName,
                Present = _AssiduiteService.CheckStudentPresence(courseId, m.Id),
            }).ToList().AsQueryable();
        }

        // PUT: api/Assiduite
        [ResponseType(typeof(Assiduite))]
        public HttpResponseMessage PutAssiduite(Assiduite Assiduite)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var existingPresence = _AssiduiteService.GetAll().Where(x => x.CourseSessionId == Assiduite.CourseSessionId && x.StudentId == Assiduite.StudentId).FirstOrDefault();
                    if (existingPresence == null)
                        _AssiduiteService.Create(Assiduite);
                    else
                    {
                        existingPresence.Present = Assiduite.Present;
                        _AssiduiteService.Update(existingPresence);
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

        // POST: api/Assiduite
        [ResponseType(typeof(Assiduite))]
        public HttpResponseMessage PostAssiduite(Assiduite model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _AssiduiteService.Create(model);
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

        // POST: api/Assiduite
        [ResponseType(typeof(PresenceModels))]
        public HttpResponseMessage PostAssiduite(int courseId, int disciplineId, int levelId, bool present)
        {
            try
            {
                var members = _disciplineLevelService.GetStudentsByCourse(levelId, disciplineId).ToList();
                var models = new List<PresenceModels>();

                foreach (var student in members)
                {
                    var existingPresence = _AssiduiteService.GetAll().Where(x => x.CourseSessionId == courseId && x.StudentId == student.Id).FirstOrDefault();
                    if (existingPresence == null)
                        _AssiduiteService.Create(new Assiduite { CourseSessionId = courseId, StudentId = student.Id, Present = present });
                    else
                    {
                        existingPresence.Present = present;
                        _AssiduiteService.Update(existingPresence);
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