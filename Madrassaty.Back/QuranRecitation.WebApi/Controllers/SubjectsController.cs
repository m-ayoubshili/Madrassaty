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
    public class SubjectsController : ApiController
    {
        private readonly ISubjectService _subjectService;

        public SubjectsController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        // GET: api/Subjects
        public IQueryable<Subject> GetSubjects()
        {
            return _subjectService.GetAll().ToList().AsQueryable();
        }

        // GET: api/Subjects/5
        [ResponseType(typeof(Subject))]
        public HttpResponseMessage GetSubject(int id)
        {
            var subject = _subjectService.GetById(id);
            if (subject != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, subject);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/Subjects/5
        [ResponseType(typeof(Subject))]
        public HttpResponseMessage PutSubject(int id, Subject subject)
        {
            if (ModelState.IsValid && id == subject.Id)
            {
                try
                {
                    subject.Id = id;
                    _subjectService.Update(subject);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, subject);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Subjects
        [ResponseType(typeof(Subject))]
        public HttpResponseMessage PostSubject(Subject model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _subjectService.Create(model);
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

        // DELETE: api/Subjects/5
        [ResponseType(typeof(Subject))]
        public HttpResponseMessage DeleteSubject(int id)
        {
            var subject = _subjectService.GetById(id);

            if (subject == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _subjectService.Delete(subject);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, subject);
        }
    }
}