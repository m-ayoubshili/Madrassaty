using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    public class CustomUserRole : IdentityUserRole<Guid> {
    }
    public class CustomUserClaim : IdentityUserClaim<Guid> {
    }
    public class CustomUserLogin : IdentityUserLogin<Guid> {
    }

    public class CustomRole : IdentityRole<Guid, CustomUserRole>
    {
        public CustomRole() { }
        public CustomRole(string name) { Name = name; }
    }

    public class CustomUserStore : UserStore<Member, CustomRole, Guid, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public CustomUserStore(QuranRecitationDbContext context)
            : base(context)
        {
        }
    }

    public class CustomRoleStore : RoleStore<CustomRole, Guid, CustomUserRole>
    {
        public CustomRoleStore(QuranRecitationDbContext context)
            : base(context)
        {
        }
    }
}