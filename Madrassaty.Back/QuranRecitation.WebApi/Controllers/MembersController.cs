using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Utils;
using QuranRecitation.WebApi.Models;
using QuranRecitation.Data;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System.Collections.Generic;

namespace QuranRecitation.WebApi.Controllers
{
    
    public class MembersController : ApiController
    {
        private readonly IMemberService _memberService;
        private readonly IMemberStatusService _memberStatusService;
        private readonly ICourseService _courseService;
        private readonly IDisciplineLevelService _levelService;
        public EmailBody email = new EmailBody();

        public MembersController(IMemberService memberService, 
            IMemberStatusService memberStatusService, 
            ICourseService courseService,
            IDisciplineLevelService levelService)
        {
            _memberService = memberService;
            _memberStatusService = memberStatusService;
            _courseService = courseService;
            _levelService = levelService;
        }

        #region Member Status
        [HttpGet, Route("api/Members/MemberStatuses")]
        public HttpResponseMessage AllMemberStatus()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _memberStatusService.GetAll());
        }
        #endregion

        #region Member
        // GET: api/Members
        public IQueryable<Member> GetMembers()
        {
            var members = _memberService.GetAll().ToList().AsQueryable();
            return members;
        }

        [HttpGet, Route("api/Members/Teachers")]
        public IQueryable<MemberFilterModel> GetTeachers()
        {
            var members = _memberService.GetAll().Where(x => x.MemberStatusId == 2).ToList();
            return members.Select(m => new MemberFilterModel()
            {
                Id = m.Id.ToString(),
                FullName = m.FullName
            }).ToList().AsQueryable();
        }

        [HttpGet, Route("api/Members/Students")]
        public IQueryable<MemberFilterModel> GetStudents()
        {
            var members = _memberService.GetAll().Where(x => x.MemberStatusId == 4).ToList();
            var model = members.Select(m => new MemberFilterModel()
            {
                Id = m.Id.ToString(),
                FullName = m.FullName,
                Sex = m.Gender,
                BirthDate = m.BirthDate.Value,
                EnabledToAssign = true,
                IsSelected = true
            }).ToList();

            return model.AsQueryable();
        }

        [HttpGet, Route("api/Members/Students/{levelId:int}")]
        public IQueryable<MemberFilterModel> GetStudents(int levelId)
        {
            var members = _memberService.GetAll().Where(x => x.MemberStatusId == 4).ToList();
            var model = members.Select(m => new MemberFilterModel()
            {
                Id = m.Id.ToString(),
                FullName = m.FullName,
                Sex = m.Gender,
                BirthDate = m.BirthDate.Value,
                EnabledToAssign =  (!(_levelService.CheckStudentSameDisciplineExistence(levelId, m.Id))) ,
                IsSelected =  _levelService.CheckStudentExistence(levelId, m.Id) 
            }).ToList();

            return model.Where(x => x.EnabledToAssign).AsQueryable();
        }


        // GET: api/Members/5
        [ResponseType(typeof(Member))]
        public HttpResponseMessage GetMember(Guid id)
        {
            var member = _memberService.GetById(id);
            return member == null ? 
                Request.CreateResponse(HttpStatusCode.BadRequest, new HttpError("Invalid ID")) :
                Request.CreateResponse(HttpStatusCode.OK, member);
        }

        // PUT: api/Members/5
        [ResponseType(typeof(void))]
        public HttpResponseMessage PutMember(Guid id, MemberModel model)
        {
            if (ModelState.IsValid && id == model.Member.Id)
            {
                try
                {
                    if (!string.IsNullOrEmpty(model.PhotoBytes))
                    {
                        byte[] bytes = Convert.FromBase64String(model.PhotoBytes);
                        if (bytes != null && bytes.ToList().Count > 0)
                        {
                            FileUtility.SaveUploadedPhoto(bytes, id.ToString());
                            model.Member.PhotoPath = id.ToString() + ".jpg";
                        }
                        else
                        {
                            model.Member.PhotoPath = "Unknown.jpg";
                        }
                    }
                    else
                    {
                        model.Member.PhotoPath = System.IO.Path.GetFileName(model.Member.PhotoPath);
                    }

                    _memberService.Update(model.Member);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, model.Member);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // PUT: api/Members/PutMemberLogins
        [System.Web.Http.OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("api/Members/PutMemberLogins")]
        [HttpPut]
        public async Task<HttpResponseMessage> PutMemberLogins(MemberLoginModel model)
        {
            var id = model.Id;
            if (id != null)
            {
                ApplicationUserManager userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
                String hashedNewPassword = userManager.PasswordHasher.HashPassword(model.Password);

                var member = _memberService.GetById(id);
                //member.UserName = model.UserName;
                member.PasswordHash = hashedNewPassword;
                _memberService.Update(member);
                //sending email after inscription
                var subject = "Mot de passe oublié";
                var htmlContent = email.GenerateBodyEmailChangePassword(member);
                await Mail.SendSingleEmail(subject, member.Email, htmlContent);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Members
        [ResponseType(typeof(Member))]
        public async Task<HttpResponseMessage> PostMember(MemberModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    model.Member.Id = Guid.NewGuid();

                    // put photo
                    if (!string.IsNullOrEmpty(model.PhotoBytes))
                    {
                        byte[] bytes = Convert.FromBase64String(model.PhotoBytes);
                        if (bytes != null && bytes.ToList().Count > 0)
                        {
                            FileUtility.SaveUploadedPhoto(bytes, model.Member.Id.ToString());
                            model.Member.PhotoPath = model.Member.Id.ToString() + ".jpg";
                        }
                        else
                        {
                            model.Member.PhotoPath = "Unknown.jpg";
                        }
                    }
                    else
                    {
                        model.Member.PhotoPath = System.IO.Path.GetFileName(model.Member.PhotoPath);
                    }

                    // create new user
                    var userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
                    model.Member.EmailConfirmed = true;
                    var result = await userManager.CreateAsync(model.Member, model.Password);

                    if (result.Succeeded)
                    {
                        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model.Member);
                        response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = model.Member.Id }));
                        return response;
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    } 
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/Members/5
        [ResponseType(typeof(Member))]
        public HttpResponseMessage DeleteMember(Guid id)
        {
            var member = _memberService.GetById(id);

            if (member == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                var courses = _courseService.GetAll().Where(x => x.TeacherId == member.Id).ToList();
                foreach (var course in courses)
                {
                    _courseService.Delete(course);
                }
                _memberService.Delete(member);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, member);
        }

        [AllowAnonymous]
        [HttpGet, Route("api/Members/GetMembersBySchoolId/{id:int}")]
        public List<string> GetMembersBySchoolId(int id)
        {

            var emails = _memberService.GetBySchoolId(id).ToList();
            return emails;
        }
        #endregion
    }
}