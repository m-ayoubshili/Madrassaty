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
    [Authorize]
    public class StudentDisciplineLevelController : ApiController
    {
        private readonly IStudentDisciplineLevelService _studentDisciplineLevelService;

        public StudentDisciplineLevelController(IStudentDisciplineLevelService studentDisciplineLevelService)
        {
            _studentDisciplineLevelService = studentDisciplineLevelService;
        }
        // GET: api/StudentDisciplineLevel/5/6
        [HttpGet]
        [ResponseType(typeof(StudentDisciplineLevel))]
        public HttpResponseMessage GetStudentDisciplineLevel(Guid studentId,int disciplineId)
        {
            var studentDisciplineLevel = _studentDisciplineLevelService.GetAll().Where(a=>a.StudentId == studentId && a.DisciplineId == disciplineId).FirstOrDefault();
            if (studentDisciplineLevel != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, studentDisciplineLevel);
            }
            return Request.CreateResponse(HttpStatusCode.NotFound);
           
        }
        // POST: api/StudentDisciplineLevel
        [ResponseType(typeof(StudentDisciplineLevel))]
        public HttpResponseMessage PostStudentDisciplineLevel(StudentDisciplineLevel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _studentDisciplineLevelService.Create(model);
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

    }
}
