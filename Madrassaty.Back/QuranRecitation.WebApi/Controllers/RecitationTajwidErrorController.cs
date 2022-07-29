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
    public class RecitationTajwidErrorController : ApiController
    {
        private readonly IRecitationTajwidErrorService _recitationTajwidErrorService;
        private readonly ITajwidErrorService _tajwidErrorService;


        public RecitationTajwidErrorController(IRecitationTajwidErrorService recitationTajwidErrorService,ITajwidErrorService tajwidErrorService)
        {
            _recitationTajwidErrorService = recitationTajwidErrorService;
            _tajwidErrorService = tajwidErrorService;
        }

        // GET: api/RecitationTajwidError
        public IQueryable<RecitationTajwidError> GetAll()
        {
            return _recitationTajwidErrorService.GetAll().ToList().AsQueryable();
        }

        // GET: api/RecitationTajwidError/5
        [ResponseType(typeof(RecitationTajwidError))]
        public HttpResponseMessage Get(int id)
        {
            RecitationTajwidError recitationTajwidError = _recitationTajwidErrorService.GetById(id);
            if (recitationTajwidError != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, recitationTajwidError);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
        // GET: api/RecitationTajwidError/5
        [HttpGet, Route("api/RecitationTajwidError/RecitationDetail/{recitationDetailId:int}")]
        public IQueryable GetByRecitationDetailId(int recitationDetailId)
        {
            var recitationTajwidError = _recitationTajwidErrorService.GetAll().Where(a => a.RecitationDetailId == recitationDetailId).ToList();

            return recitationTajwidError.AsQueryable();
        }

        // POST: api/RecitationTajwidError
        [ResponseType(typeof(List<RecitationTajwidError>))]
        public HttpResponseMessage Post(List<RecitationTajwidError> model)
        {

            try
            {
                var recitationDetailId = model.FirstOrDefault().RecitationDetailId;
                var father = _tajwidErrorService.GetById(model.FirstOrDefault().TajwidErrorId).ParentId;
                var existingList = _recitationTajwidErrorService.GetAll().Where(x => x.RecitationDetailId == recitationDetailId && x.TajwidError.ParentId== father).ToList();
                if (existingList != null)
                {
                    foreach (var olditem in existingList)
                    {
                        _recitationTajwidErrorService.Delete(olditem);
                    }
                }
                var models = new List<RecitationTajwidError>();

                foreach (var item in model)
                {




                    var existingPresence = _recitationTajwidErrorService.GetAll().Where(x => x.TajwidErrorId == item.TajwidErrorId && x.RecitationDetailId == item.RecitationDetailId).FirstOrDefault();
                    if (existingPresence == null)
                        _recitationTajwidErrorService.Create(new RecitationTajwidError
                        {
                            Id = item.Id,
                            TajwidErrorId = item.TajwidErrorId,
                            RecitationDetailId = item.RecitationDetailId
                        });
                    else
                    {
                        _recitationTajwidErrorService.Update(existingPresence);
                    }

                    models.Add(new RecitationTajwidError
                    {
                        Id = item.Id,
                        TajwidErrorId = item.TajwidErrorId,
                        RecitationDetailId = item.RecitationDetailId
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

        // PUT: api/RecitationTajwidError/5
        [ResponseType(typeof(RecitationTajwidError))]
        public HttpResponseMessage Put(int id, RecitationTajwidError recitationTajwidError)
        {
            if (ModelState.IsValid && id == recitationTajwidError.Id)
            {
                try
                {
                    recitationTajwidError.Id = id;
                    _recitationTajwidErrorService.Update(recitationTajwidError);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, recitationTajwidError);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/RecitationTajwidError/5
        [ResponseType(typeof(RecitationTajwidError))]
        public HttpResponseMessage Delete(int id)
        {
            var recitationTajwidError = _recitationTajwidErrorService.GetById(id);

            if (recitationTajwidError == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _recitationTajwidErrorService.Delete(recitationTajwidError);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, recitationTajwidError);
        }
    }
}
