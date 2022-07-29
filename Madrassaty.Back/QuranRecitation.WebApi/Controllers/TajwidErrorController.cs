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
    public class TajwidErrorController : ApiController
    {
        private readonly ITajwidErrorService _tajwidErrorService;
        public TajwidErrorController(ITajwidErrorService tajwidErrorService)
        {
            _tajwidErrorService = tajwidErrorService;
        }
        // GET: api/TajwidError
        [HttpGet, Route("api/TajwidError/RootItems")]
        public IQueryable<TajwidErrorModel> GetRootTajwidErrors()
        {
            var tajwidError = _tajwidErrorService.GetAll().ToList();
            return tajwidError.Where(x => x.Parent == null).Select(x => new TajwidErrorModel()
            {
                Id = x.Id,
                Wording = x.Wording,
                children = x.children,
                ParentId=x.ParentId

            }).AsQueryable();

        }
        // GET: api/TajwidError
        [HttpGet, Route("api/TajwidError/All")]
        public IQueryable<TajwidErrorModel> GetTajwidErrors()
        {
            var tajwidError = _tajwidErrorService.GetAll().ToList();
            return tajwidError.Select(x => new TajwidErrorModel()
            {
                Id = x.Id,
                Wording = x.Wording,
                children = x.children,
                ParentId = x.ParentId

            }).AsQueryable();

        }
        // GET: api/TajwidError/5
        [ResponseType(typeof(TajwidErrorModel))]

        public HttpResponseMessage GetTajwidError(int id)
        {
            var tajwidError = _tajwidErrorService.GetById(id);
            if (tajwidError != null)
            {
                var model = new TajwidErrorModel()
                {
                    Id = tajwidError.Id,
                    Wording = tajwidError.Wording,
                    ParentId=tajwidError.ParentId,
                    children = tajwidError.children
                };
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // POST: api/TajwidError
        [ResponseType(typeof(TajwidErrorModel))]
        public HttpResponseMessage PostTajwidError(TajwidErrorModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var tajwid = new TajwidError()
                    {
                        Wording = model.Wording,
                    };
                    _tajwidErrorService.Create(tajwid);

                    model = new TajwidErrorModel()
                    {
                        Id = tajwid.Id,
                        Wording = tajwid.Wording,
                        children = tajwid.children,

                    };
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

        // PUT: api/TajwidError/5
        [ResponseType(typeof(TajwidErrorModel))]
        public HttpResponseMessage PutTajwidError(int id, TajwidErrorModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var tajwidError = _tajwidErrorService.GetById(id);
                    tajwidError.Wording = model.Wording;
                    tajwidError.ParentId = model.ParentId;
                    _tajwidErrorService.Update(tajwidError);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/TajwidError/5
        [ResponseType(typeof(TajwidErrorModel))]
        public HttpResponseMessage DeleteTajwidError(int id)
        {
            var tajwidError = _tajwidErrorService.GetById(id);

            if (tajwidError == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _tajwidErrorService.Delete(tajwidError);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tajwidError);


        }
    }
}
