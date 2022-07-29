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
    public class RecitationDetailController : ApiController
    {
        private readonly IRecitationDetailService _recitationDetailService;
        public RecitationDetailController(IRecitationDetailService recitationDetailService)
        {
            _recitationDetailService = recitationDetailService;
        }

        // GET: api/RecitationDetail
        public IQueryable<RecitationDetail> GetAll()
        {
            return _recitationDetailService.GetAll().ToList().AsQueryable();

        }

        [HttpGet, Route("api/RecitationDetail/GetAllByIdStudent/{id}")]
        public IQueryable<RecitationDetail> GetAllByIdStudent(Guid id)
        {
            return _recitationDetailService.GetAll().Where(x => x.StudentId == id).ToList().AsQueryable();
        }

        // GET: api/RecitationDetail/5
        [ResponseType(typeof(RecitationDetail))]
        public HttpResponseMessage Get(int id)
        {
            var recitationDetail = _recitationDetailService.GetById(id);
            if (recitationDetail != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, recitationDetail);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
        // GET: api/RecitationDetail/5
        [ResponseType(typeof(RecitationDetail))]
        public HttpResponseMessage GetByRecitationAndStudent(Guid studentId, int recitationId)
        {
            var recitationDetail = _recitationDetailService.GetAll().Where(a => a.StudentId == studentId && a.RecitationId == recitationId).FirstOrDefault();
            if (recitationDetail != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, recitationDetail);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
        [HttpPost, Route("api/RecitationDetail/GetAllByIdStudentAndRecitation")]
        [ResponseType(typeof(RecitationDetail))]
        public IQueryable<RecitationDetail> GetAllByRecitationAndStudent(RecitationDetailModel searchModel)
        {
           // var y = dateEvaluation.ToLocalTime();
         var x = _recitationDetailService.GetAll().Where(a => a.StudentId == searchModel.StudentId && a.RecitationId == searchModel.RecitationId && a.RecitationSession.TypeEvaluation=="D" && a.DateEvaluation== searchModel.DateEvaluation).ToList().AsQueryable();
            return x;
        }

        // POST: api/RecitationDetail
        [ResponseType(typeof(RecitationDetail))]
        public HttpResponseMessage Post(RecitationDetail model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var recitationDetail = _recitationDetailService.GetAll().Where(a => a.StudentId == model.StudentId && a.RecitationId == model.RecitationId && a.DateEvaluation == model.DateEvaluation && a.Surah==model.Surah).FirstOrDefault();
                    if (recitationDetail == null)
                    {
                        _recitationDetailService.Create(model);

                    }
                    else
                    {
                        model.Id = recitationDetail.Id;
                        model.RecitationId = recitationDetail.RecitationId;
                        model.RecitationSession = recitationDetail.RecitationSession;
                        model.StudentId = recitationDetail.StudentId;
                        model.Student = recitationDetail.Student;
                        model.Surah = recitationDetail.Surah;
                        model.VerseDebut = recitationDetail.VerseDebut;
                        model.VerseFin = recitationDetail.VerseFin;
                        model.Rating = recitationDetail.Rating;
                        model.Remarques = recitationDetail.Remarques;
                        model.DateEvaluation = recitationDetail.DateEvaluation;

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

        // PUT: api/RecitationDetail/5
        [ResponseType(typeof(RecitationDetail))]

        public HttpResponseMessage Put(int id, RecitationDetail recitationDetail)
        {
            if (ModelState.IsValid && id == recitationDetail.Id)
            {
                try
                {
                    recitationDetail.Id = id;
                    _recitationDetailService.Update(recitationDetail);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, recitationDetail);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/RecitationDetail/5
        [ResponseType(typeof(RecitationDetail))]
        public HttpResponseMessage Delete(int id)
        {
            var recitationDetail = _recitationDetailService.GetById(id);

            if (recitationDetail == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _recitationDetailService.Delete(recitationDetail);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, recitationDetail);
        }
    }
}
