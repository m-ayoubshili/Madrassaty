using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class MemberLoginModel
    {
        public Guid Id { get; set; }
        //public string UserName { get; set; }
        public string Password { get; set; }
        //public string ConfirmPassword { get; set; }
    }
}