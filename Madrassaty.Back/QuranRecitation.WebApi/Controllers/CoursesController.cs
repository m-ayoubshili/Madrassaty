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
    public class CoursesController : ApiController
    {
        private readonly ICourseService _courseService;
        private readonly ICourseSessionService _CourseSessionService;


        public CoursesController(ICourseService courseService, ICourseSessionService courseSessionService)
        {
            _courseService = courseService;
            _CourseSessionService = courseSessionService;
        }

        #region Api methods
        // GET: api/Courses
        public IQueryable<CourseModel> GetCourses()
        {
            var models = new List<CourseModel>();
            var courses = _courseService.GetAll().ToList();

            foreach (var course in courses)
            {
                models.Add(EntityToModelMapping(course));
            }
            return models.AsQueryable();
        }

        // GET: api/Courses/5
        [ResponseType(typeof(CourseModel))]
        public HttpResponseMessage GetCourse(int id)
        {
            var course = _courseService.GetById(id);
            if (course != null)
            {
                var model = EntityToModelMapping(course);
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/Courses/5
        [ResponseType(typeof(CourseModel))]
        public HttpResponseMessage PutCourse(int id, CourseModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var course = ModelToEntityMapping(model);
                    _courseService.Update(course);

                    model = EntityToModelMapping(course);
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

        // POST: api/Courses
        [ResponseType(typeof(CourseModel))]
        public HttpResponseMessage PostCourse(CourseModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var course = ModelToEntityMapping(model);
                    _courseService.Create(course);
                    model = EntityToModelMapping(course);
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

        // DELETE: api/Courses/5
        [ResponseType(typeof(CourseModel))]
        public HttpResponseMessage DeleteCourse(int id)
        {
            var course = _courseService.GetById(id);
            var model = EntityToModelMapping(course);

            if (course == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _courseService.Delete(course);
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
        private CourseModel EntityToModelMapping(Course course)
        {
            var differentDate = course.StartDate.ToShortDateString() != DateTime.Now.ToShortDateString();
            return new CourseModel()
            {
                Id = course.Id,
                Name = course.Name,
                ClassroomId = course.ClassroomId,
                Classroom = course.Classroom != null ? course.Classroom.Wording : "",
                DisciplineLevelId = course.DisciplineLevelId,
                Discipline = (course.DisciplineLevel != null && course.DisciplineLevel.Discipline != null) ? course.DisciplineLevel.Discipline.Wording : "",
                DisciplineId = (course.DisciplineLevel != null && course.DisciplineLevel.Discipline != null) ? course.DisciplineLevel.Discipline.Id : 0,
                DisciplineLevel = course.DisciplineLevel != null ? course.DisciplineLevel.Wording : "",
                TeacherId = course.TeacherId,
                Teacher = course.Teacher.FullName,
                StartDate = course.StartDate,
                EndTime = course.EndTime,
                Begin = course.StartDate,
                End = course.EndTime,
                CreatedOn = course.CreatedOn,
                Jour = course.Jour,
                T1 = course.T1,
                T2 = course.T2,
                T3 = course.T3,
                RecurrenceId = course.RecurrenceId,
                Recurrence = course.Recurrence != null ? course.Recurrence.Wording : "",
                DisabledToCreate=  differentDate

            };
        }

        [NonAction]
        private Course ModelToEntityMapping(CourseModel model)
        {
            return new Course()
            {
                Id = model.Id,
                Name = model.Name,
                ClassroomId = model.ClassroomId,
                DisciplineLevelId = model.DisciplineLevelId,
                TeacherId = model.TeacherId,
                StartDate = model.StartDate.Date.AddHours(model.Begin.Hour).AddMinutes(model.Begin.Minute).AddSeconds(0),
                EndTime = model.StartDate.Date.AddHours(model.End.Hour).AddMinutes(model.End.Minute).AddSeconds(0),
                CreatedOn = model.CreatedOn,
                Jour = model.Jour,
                T1 = model.T1,
                T2 = model.T2,
                T3 = model.T3,
                RecurrenceId = model.RecurrenceId
            };
        }
        #endregion
    }
}
