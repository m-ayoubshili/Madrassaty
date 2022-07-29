using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using QuranRecitation.Data;
using QuranRecitation.Data.Model;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QuranRecitation.WebApi.Models
{
    
    public class MemberModel
    {
        public Member Member { get; set; }
        public string PhotoBytes { get; set; }
        public string Password { get; set; }
    }
}