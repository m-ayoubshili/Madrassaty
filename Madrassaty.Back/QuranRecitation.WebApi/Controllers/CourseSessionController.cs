using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using QuranRecitation.WebApi.Utils;
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
    public class CourseSessionController : ApiController
    {
        private readonly ICourseSessionService _courseSessionService;

        public CourseSessionController(ICourseSessionService courseSessionService)
        {
            _courseSessionService = courseSessionService;
        }

        #region Api methods
        // GET: api/CourseSessions
        public IQueryable<CourseSessionModel> GetCourseSessions()
        {
            var models = new List<CourseSessionModel>();
            var courseSessions = _courseSessionService.GetAll().ToList();

            foreach (var courseSession in courseSessions)
            {
                models.Add(EntityToModelMapping(courseSession));
            }
            return models.AsQueryable();
        }

        // GET: api/CourseSessions/5
        [ResponseType(typeof(CourseSessionModel))]
        public HttpResponseMessage GetCourseSession(int id)
        {
            var courseSession = _courseSessionService.GetById(id);
            if (courseSession != null)
            {
                var model = EntityToModelMapping(courseSession);
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/CourseSessions/5
        [ResponseType(typeof(CourseSessionModel))]
        public HttpResponseMessage PutCourseSession(int id, CourseSessionModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var courseSession = ModelToEntityMapping(model);
                    _courseSessionService.Update(courseSession);

                    model = EntityToModelMapping(courseSession);
                    return Request.CreateResponse(HttpStatusCode.OK, model);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/CourseSession
        [ResponseType(typeof(CourseSessionModel))]
        public HttpResponseMessage PostCourseSession(CourseSessionModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var courseSession = ModelToEntityMapping(model);

                    var existsCourseSession = _courseSessionService.GetAll().Where(a=>a.Id==model.Id).FirstOrDefault();
                    if (existsCourseSession == null)
                    {
                        
                        _courseSessionService.Create(courseSession);
                        model = EntityToModelMapping(courseSession);
                    }
                    else
                    {
                        model = EntityToModelMapping(courseSession);

                    }


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

        // DELETE: api/CourseSessions/5
        [ResponseType(typeof(CourseSessionModel))]
        public HttpResponseMessage DeleteCourseSession(int id)
        {
            var courseSession = _courseSessionService.GetById(id);
            var model = EntityToModelMapping(courseSession);

            if (courseSession == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _courseSessionService.Delete(courseSession);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, model);
        }
        #endregion

        #region Mapping
        [NonAction]
        private CourseSessionModel EntityToModelMapping(CourseSession courseSession)
        {
            return new CourseSessionModel()
            {
                Id = courseSession.Id,
                Wording = courseSession.Wording,
                CourseId = courseSession.CourseId,
                Course = courseSession.Course != null ? courseSession.Course.Name : "",
                StartDate = courseSession.StartDate,
                EndTime = courseSession.EndTime,
                Begin = courseSession.StartDate,
                End = courseSession.EndTime,
                Remarque=courseSession.Remarque

            };
        }

        [NonAction]
        private CourseSession ModelToEntityMapping(CourseSessionModel model)
        {
            return new CourseSession()
            {
                Id = model.Id,
                Wording = model.Wording,
                CourseId = model.CourseId, 
                StartDate = model.StartDate.Date.AddHours(model.Begin.Hour).AddMinutes(model.Begin.Minute).AddSeconds(0),
                EndTime = model.StartDate.Date.AddHours(model.End.Hour).AddMinutes(model.End.Minute).AddSeconds(0),
                Remarque = model.Remarque

            };
        }
        #endregion
    }
}
