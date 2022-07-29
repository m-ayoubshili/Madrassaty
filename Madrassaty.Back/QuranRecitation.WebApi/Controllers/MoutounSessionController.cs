using QuranRecitation.Data;
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
    public class MoutounSessionController : ApiController
    {
        private readonly IMoutounService _moutounService;
        private readonly IMoutounSessionService _moutounSessionService;
        private readonly IMoutounSessionDetailService _moutounSessionDetailService;
        private readonly IMemberService _MemberService;  

       public MoutounSessionController(IMoutounSessionService moutounSessionService,
                                        IMoutounService moutounService,
                                        IMoutounSessionDetailService moutounSessionDetailService,
                                        IMemberService memberService
                                        )
        {
            _moutounService = moutounService;
            _moutounSessionService = moutounSessionService;
            _moutounSessionDetailService = moutounSessionDetailService;
            _MemberService = memberService;
        }

        // GET: api/MoutounSession
        public IQueryable<MoutounSessionModel> GetMoutounSession()
        {
            var moutounSessions = _moutounSessionService.GetAll().ToList().AsQueryable();
            var results = new List<MoutounSessionModel>();
            foreach (var session in moutounSessions)
            {
                //var numberVerdict = _moutounService.GetById(session.MoutounId).NumberVerdict;
                var numberVerdict = session.Moutoun.NumberVerdict;
                var progression = 0;

                results.Add(EntityToModelMapping(session));
                //results.Add(new MoutounSessionModel
                //{
                //    Id = session.Id,
                //    MoutounId = session.MoutounId,
                //    MoutounName = session.Moutoun.Wording,
                //    StudentId = session.StudentId,
                //    StudentName = session.Student.FullName,
                //    TeacherId = session.TeacherId,
                //    TeacherName = session.Teacher.FullName,
                //    progression = progression
                //});
            }
            return results.AsQueryable();


        }

        // GET: api/MoutounSession/5
        [ResponseType(typeof(MoutounSession))]
        public HttpResponseMessage GetMoutounSession(int id)
        {
            var moutounSession = _moutounSessionService.GetById(id);
            if (moutounSession != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, moutounSession);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/MoutounSession/5
        [ResponseType(typeof(MoutounSessionModel))]
        public HttpResponseMessage PutMoutounSession(int id, MoutounSessionModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var moutounSession = ModelToEntityMapping(model);
                    _moutounSessionService.Update(moutounSession);                    
                    model = EntityToModelMapping(moutounSession);
                    return Request.CreateResponse(HttpStatusCode.OK, model);
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/MoutounSession
        [ResponseType(typeof(MoutounSessionModel))]
        public HttpResponseMessage PostMoutounSession(MoutounSessionModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var moutounSession = ModelToEntityMapping(model);
                    _moutounSessionService.Create(moutounSession);                   
                    model = EntityToModelMapping(moutounSession);
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

        // DELETE: api/MoutounSession/5
        [ResponseType(typeof(MoutounSession))]
        public HttpResponseMessage DeleteMoutounSession(int id)
        {
            var moutounSession = _moutounSessionService.GetById(id);

            if (moutounSession == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _moutounSessionService.Delete(moutounSession);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, moutounSession);
        }

        #region Mapping
        [NonAction]
        private MoutounSessionModel EntityToModelMapping(MoutounSession moutounSession)
        {
            string  TeacherName = "", StudentName = "", MoutounName = "";
            if (moutounSession.Teacher != null)
            {
                TeacherName = moutounSession.Teacher.FullName;
            }
            else if (moutounSession.TeacherId != Guid.Empty)
            {
                var _member = _MemberService.GetById(moutounSession.TeacherId);
                if (_member != null)
                {
                    TeacherName = _member.FullName;
                }
            }
            if (moutounSession.Student != null)
            {
                StudentName = moutounSession.Student.FullName;
            }
            else if (moutounSession.StudentId != Guid.Empty)
            {
                var _member = _MemberService.GetById(moutounSession.StudentId);
                if (_member != null)
                {
                    StudentName = _member.FullName;
                }

            }
            if (moutounSession.Moutoun != null)
            {
                MoutounName = moutounSession.Moutoun.Wording;
            }
            else if (moutounSession.MoutounId != 0)
            {
               var _matin = _moutounService.GetById(moutounSession.MoutounId);
                if (_matin != null)
                {
                    MoutounName = _matin.Wording;
                }
            }

            return new MoutounSessionModel()
            {
                Id = moutounSession.Id,
                TeacherId = moutounSession.TeacherId,
                TeacherName = TeacherName,
                StudentId = moutounSession.StudentId,
                StudentName = StudentName, 

                MoutounId = moutounSession.MoutounId,
                MoutounName = MoutounName 

            };
        }

        [NonAction]
        private MoutounSession ModelToEntityMapping(MoutounSessionModel model)
        {
            return new MoutounSession()
            {
                Id = model.Id,
                TeacherId = model.TeacherId,
                StudentId = model.StudentId,
                MoutounId = model.MoutounId,

            };
        }
        #endregion
    }


}
