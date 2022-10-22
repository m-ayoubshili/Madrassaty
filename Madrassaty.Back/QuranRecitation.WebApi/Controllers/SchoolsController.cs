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
    public class SchoolsController : ApiController
    {
        private readonly ISchoolService _schoolService;

        public SchoolsController(ISchoolService schoolService)
        {
            _schoolService = schoolService;
        }

        // GET: api/Schools
        [AllowAnonymous]
        public IQueryable<School> GetSchools()
        {
            return _schoolService.GetAll().ToList().AsQueryable();
        }

        // GET: api/Schools/5
        [ResponseType(typeof(School))]
        public HttpResponseMessage GetDefaultSchool(int id)
        {
            var school = _schoolService.GetById(id);
            return school == null ?
                Request.CreateResponse(HttpStatusCode.BadRequest, new HttpError("Invalid ID")) :
                Request.CreateResponse(HttpStatusCode.OK, school);
        }

        // POST: api/Schools new features
        [ResponseType(typeof(School))]
        public HttpResponseMessage PostSchool(SchoolModel model) 
        {

            var m = model.School.Name;
            var schoolExists = _schoolService.GetAll().Select(x => x.Name).ToList().Contains(m);
            if (ModelState.IsValid && (!schoolExists))
            {
                try
                {
                    // put photo
                    if (!string.IsNullOrEmpty(model.PhotoBytes))
                    {
                        byte[] bytes = Convert.FromBase64String(model.PhotoBytes);
                        if (bytes != null && bytes.ToList().Count > 0)
                        {
                            _schoolService.Create(model.School);
                            FileUtility.SaveUploadedPhoto(bytes, model.School.Id.ToString(), true);
                            model.School.PhotoPath = model.School.Id.ToString() + ".jpg";
                            _schoolService.Update(model.School);


                        }
                        else
                        {
                            model.School.PhotoPath = "madrasaty_logo..jpg";
                            _schoolService.Create(model.School);
                        }
                    }
                    else
                    {
                        model.School.PhotoPath = System.IO.Path.GetFileName(model.School.PhotoPath);
                        _schoolService.Create(model.School);

                    }
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = model.School.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: api/Schools/5
        [ResponseType(typeof(void))]
        public HttpResponseMessage PutSchool(int id, SchoolModel model)
        {
            var m = model.School.Name;
            var schoolExists = _schoolService.GetAll().Select(x => x.Name).ToList().Contains(m);

            if (ModelState.IsValid && id == model.School.Id && schoolExists)
            {
                try
                {
                    if (!string.IsNullOrEmpty(model.PhotoBytes))
                    {
                        byte[] bytes = Convert.FromBase64String(model.PhotoBytes);
                        if (bytes != null && bytes.ToList().Count > 0)
                        {
                            FileUtility.SaveUploadedPhoto(bytes, model.School.Id.ToString(), true);
                            model.School.PhotoPath = model.School.Id.ToString() + ".jpg";
                        }
                        else
                        {
                            model.School.PhotoPath = "madrasaty_logo.png";
                        }
                    }
                    else
                    {
                        model.School.Photo = System.IO.Path.GetFileName(model.School.PhotoPath);
                    }

                    _schoolService.Update(model.School);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, model.School);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/School/5
        [ResponseType(typeof(Classroom))]
        public HttpResponseMessage DeleteSchool(int id)
        {
            var school = _schoolService.GetById(id);

            if (school == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _schoolService.Delete(school);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, school);
        }
    }
}
