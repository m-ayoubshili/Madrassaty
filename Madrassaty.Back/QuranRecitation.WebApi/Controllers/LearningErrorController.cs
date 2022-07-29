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
    public class LearningErrorController : ApiController
    {
        private readonly ILearningErrorService _learningErrorService;

        public LearningErrorController(ILearningErrorService learningErrorService)
        {
            _learningErrorService = learningErrorService;
        }

        // GET: api/LearningError
        public IQueryable<LearningError> GetLearningErrors()
        {
            return _learningErrorService.GetAll().ToList().AsQueryable();

        }

        // GET: api/LearningError/5
        [ResponseType(typeof(LearningError))]
        public HttpResponseMessage GetLearningError(int id)
        {
            var learningError = _learningErrorService.GetById(id);
            if (learningError != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, learningError);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
        // GET: api/LearningError/RecitationDetail/5
        [HttpGet, Route("api/LearningError/RecitationDetail/{recitationDetailId:int}")]
        public IQueryable GetLearningErrorByRecitationDetail(int recitationDetailId)
        {
            var learningErrors = _learningErrorService.GetAll().Where(le => le.RecitationDetailId == recitationDetailId).ToList();

            return learningErrors.AsQueryable();
        }

        // POST: api/LearningError
        [ResponseType(typeof(LearningError))]
        public HttpResponseMessage Post(LearningError model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var existingPresence = _learningErrorService.GetAll().Where(x => x.Wording == model.Wording && x.RecitationDetailId==model.RecitationDetailId).FirstOrDefault();
                    if (existingPresence == null)
                    {
                        _learningErrorService.Create(model);
                    }
                    else
                    {
                        _learningErrorService.Update(model);
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

        // PUT: api/LearningError/5
        [ResponseType(typeof(LearningError))]
        public HttpResponseMessage Put(int id, LearningError learningError)
        {
            if (ModelState.IsValid && id == learningError.Id)
            {
                try
                {
                    learningError.Id = id;
                    _learningErrorService.Update(learningError);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, learningError);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/LearningError/5
        [ResponseType(typeof(LearningError))]
        public HttpResponseMessage Delete(string id, int recitationDetailId)
        {
            var learningError = _learningErrorService.GetAll().Where(a=>a.Wording==id && a.RecitationDetailId == recitationDetailId).FirstOrDefault();

            if (learningError == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _learningErrorService.Delete(learningError);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, learningError);
        }
    }
}
