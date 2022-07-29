using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    public class StudentRecitationController : ApiController
    {
        private readonly IStudentRecitationService _studentRecitationService;
        private readonly IRecitationSessionService _recitationSessionService;

        public StudentRecitationController( IStudentRecitationService studentRecitationService, 
                                            IRecitationSessionService recitationSessionService)
        {
            _studentRecitationService = studentRecitationService;
            _recitationSessionService = recitationSessionService; 
        }

        [ResponseType(typeof(StudentRecitation))]
        public HttpResponseMessage PostStudentRecitation(StudentRecitation model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var recitation = _recitationSessionService.GetById(model.RecitationId);
                    var students = _studentRecitationService.GetAll().Where(x => x.RecitationId == model.RecitationId).ToList(); 
                    model.StartTime = recitation.StartDate.AddMinutes(students.Count * recitation.DivisionParam); 
                    _studentRecitationService.Create(model);
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
        [HttpGet, Route("api/StudentRecitation/{RecitationId:int}")]
        public IQueryable<StudentRecitationDetailsModel> GetStudentsByRecitationId(int RecitationId)
        {
            string baseUrl = HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/images/members/");
            var members = _studentRecitationService.GetAll().Where(x => x.RecitationId == RecitationId).ToList();
            var model = members.Select(m => new StudentRecitationDetailsModel()
            {
                Id=m.StudentId,
                StartTime = (DateTime)m.StartTime,
                MemberName = m.Student.FullName,
                Gender = m.Student.Gender,
                Profession = m.Student.Profession,
                PhoneNumber = m.Student.PhoneNumber,
                Email = m.Student.Email,
                BirthDate = m.Student.BirthDate,
                PhotoPath = string.IsNullOrEmpty(m.Student.PhotoPath)? baseUrl + "unknown.jpg" : baseUrl+ m.Student.PhotoPath,
            }).ToList();

            return model.AsQueryable();
        }

    }
}
