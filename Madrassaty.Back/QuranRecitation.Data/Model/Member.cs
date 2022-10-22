using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QuranRecitation.Data.Model
{
    [Table("Member")]
    public class Member : IdentityUser<Guid, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<Member, Guid> manager, string authType)
        {
            // Note the authenticationType must match the one defined in
            // CookieAuthenticationOptions.AuthenticationType 
            var userIdentity = await manager.CreateIdentityAsync(this, authType);
            // Add custom user claims here 
            return userIdentity;
        }

        [Required]
        public int SchoolId { get; set; }
        [ForeignKey("SchoolId")]
        public virtual School School { get; set; }
        [Required]
        public int MemberStatusId { get; set; }
        [ForeignKey("MemberStatusId")]
        public virtual MemberStatus MemberStatus { get; set; }

       public int MemberStateId { get; set; }
       [ForeignKey("MemberStateId")]
       public virtual MemberStates MemberStates { get; set; }
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [MaxLength(1)]
        public string Gender { get; set; }
        public string SkypeId { get; set; }
        public string ParentEmail { get; set; }
        public DateTime? BeginningDate { get; set; }
        public string Profession { get; set; }
        public DateTime? BirthDate { get; set; }
        public string PhotoPath { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string PushToken { get; set; }
        public string Country { get; set; }
        [Timestamp]
        public byte[] CreatedOn { get; set; }
      
        public virtual ICollection<StudentDisciplineLevel> StudentDisciplineLevels { get; set; }

        [NotMapped]
        public string FullName
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }
    }
}