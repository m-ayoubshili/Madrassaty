using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using QuranRecitation.Data.Model;
using System.Data.Entity.Migrations;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Collections.Generic;

namespace QuranRecitation.Data.Migrations
{
    public sealed class Configuration : DbMigrationsConfiguration<QuranRecitationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(QuranRecitationDbContext context)
        {
            context.Configuration.LazyLoadingEnabled = false;

            // add default scool
            if (context.Schools.ToList().Count == 0)
            {
                context.Schools.AddOrUpdate(
                         s => s.Name,
                         new School { Name = "UMTEF",City="Tramblay",ZipCode="93290",Country="AN",Street="2 rue de paris"}
                       );

                context.SaveChanges();
            }

            // add default member status
            if (context.MemberStatuses.ToList().Count == 0)
            {
                foreach (MemberStatusEnum memberStatus in Enum.GetValues(typeof(MemberStatusEnum)))
                    context.MemberStatuses.AddOrUpdate(ms => ms.Wording, new MemberStatus
                    {
                        Wording = memberStatus.GetType()
                            .GetMember(memberStatus.ToString()).First()
                            .GetCustomAttribute<DisplayAttribute>().GetName()
                    });
                context.SaveChanges();
            }

            if (context.MemberStates.ToList().Count == 0)
            {
                foreach (MemberStatesEnum memberStates in Enum.GetValues(typeof(MemberStatesEnum)))
                    context.MemberStates.AddOrUpdate(ms => ms.Wording, new MemberStates
                    {
                        Wording = memberStates.GetType()
                            .GetMember(memberStates.ToString()).First()
                            .GetCustomAttribute<DisplayAttribute>().GetName()
                    });
                context.SaveChanges();
            }




            // create admin User
            if (!context.Users.Any(u => u.UserName == "admin@admin.com" || u.Email == "admin@admin.com"))
            {
                var userManager = new UserManager<Member, Guid>(new CustomUserStore(context));
                // create admin user
                var user = new Member()
                {
                    Id = Guid.NewGuid(),
                    City = "Saint Denis",
                    Country = "FR",
                    Email = "admin@admin.com",
                    UserName = "admin",
                    EmailConfirmed = true,
                    Street = "boulevard carnot",
                    SkypeId = "admin.123",
                    ZipCode = "93200",
                    PhotoPath = "Unknown.jpg",
                    Profession = "administrateur",
                    Gender = "M",
                    MemberStatusId = 1,                 
                    MemberStateId=1,
                    FirstName ="Anouar",
                    LastName="BEN ZAHRA",
                    PhoneNumber="0101010101",
                    SchoolId = 1
                };
                userManager.Create(user, "passer");


                // create admin role "All"
                var roleManager = new RoleManager<CustomRole, Guid>(new CustomRoleStore(context));
                var role = new CustomRole
                {
                    Id = Guid.NewGuid(),
                    Name = "All"
                };
                roleManager.Create(role);

                // assign role to user
                userManager.AddToRole(user.Id, "All");

                context.SaveChanges();

                // get user roles
                //var roles = userManager.GetRoles(user.Id);
            }

            
        }
    }
}
