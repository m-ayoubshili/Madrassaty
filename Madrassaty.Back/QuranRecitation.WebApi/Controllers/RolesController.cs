using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using QuranRecitation.WebApi.Models;
using QuranRecitation.Data.Model;
using QuranRecitation.Data;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class RolesController : ApiController
    {
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public RolesController()
        {

        }

        public RolesController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        // GET: api/Roles
        public List<CustomRole> GetRoles()
        {
            var roleManager = new RoleManager<CustomRole, Guid>(new CustomRoleStore(new QuranRecitationDbContext()));
            return roleManager.Roles.ToList();
        }

        // GET: api/Roles/5
        [ResponseType(typeof(RoleModel))]
        public HttpResponseMessage GetRole(Guid id)
        {
            var roleManager = new RoleManager<CustomRole, Guid>(new CustomRoleStore(new QuranRecitationDbContext()));
            var role = roleManager.Roles.Where(x => x.Id == id).FirstOrDefault();
            if (role != null)
            {
                var model = new RoleModel()
                {
                    Id = role.Id.ToString(),
                    Name = role.Name
                };
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
