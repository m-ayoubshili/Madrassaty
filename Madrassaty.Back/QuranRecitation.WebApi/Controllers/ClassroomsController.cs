using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
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
    public class ClassroomsController : ApiController
    {
        private readonly IClassroomService _classroomService;

        public ClassroomsController(IClassroomService classroomService)
        {
            _classroomService = classroomService;
        }

        // GET: api/Classrooms
        public IQueryable<Classroom> GetClassrooms()
        {
            return _classroomService.GetAll().ToList().AsQueryable();
        }

        // GET: api/Classrooms/5
        [ResponseType(typeof(Classroom))]
        public HttpResponseMessage GetClassroom(int id)
        {
            var classroom = _classroomService.GetById(id);
            if (classroom != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, classroom);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/Classrooms/5
        [ResponseType(typeof(Classroom))]
        public HttpResponseMessage PutClassroom(int id, Classroom classroom)
        {
            if (ModelState.IsValid && id == classroom.Id)
            {
                try
                {
                    classroom.Id = id;
                    _classroomService.Update(classroom);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, classroom);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Classrooms
        [ResponseType(typeof(Classroom))]
        public HttpResponseMessage PostClassroom(Classroom model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _classroomService.Create(model);
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

        // DELETE: api/Classrooms/5
        [ResponseType(typeof(Classroom))]
        public HttpResponseMessage DeleteClassroom(int id)
        {
            var classroom = _classroomService.GetById(id);

            if (classroom == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _classroomService.Delete(classroom);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, classroom);
        }
    }
}
