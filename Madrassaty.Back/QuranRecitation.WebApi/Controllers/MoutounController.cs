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
    public class MoutounController : ApiController
    {
        private readonly IMoutounService _moutounService;

        public MoutounController(IMoutounService moutounService)
        {
            _moutounService = moutounService;
        }

        // GET: api/Moutoun
        public IQueryable<Moutoun> GetMoutoun()
        {
            return _moutounService.GetAll().ToList().AsQueryable();
        }

        // GET: api/Moutoun/5
        [ResponseType(typeof(Moutoun))]
        public HttpResponseMessage GetMoutoun(int id)
        {
            var moutoun = _moutounService.GetById(id);
            if (moutoun != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, moutoun);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/Moutoun/5
        [ResponseType(typeof(Moutoun))]
        public HttpResponseMessage PutMoutoun(int id, Moutoun moutoun)
        {
            if (ModelState.IsValid && id == moutoun.Id)
            {
                try
                {
                    moutoun.Id = id;
                    _moutounService.Update(moutoun);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, moutoun);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Moutoun
        [ResponseType(typeof(Moutoun))]
        public HttpResponseMessage PostMoutoun(Moutoun model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _moutounService.Create(model);
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

        // DELETE: api/Moutoun/5
        [ResponseType(typeof(Moutoun))]
        public HttpResponseMessage DeleteMoutoun(int id)
        {
            var moutoun = _moutounService.GetById(id);

            if (moutoun == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _moutounService.Delete(moutoun);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, moutoun);
        }
    }
}
