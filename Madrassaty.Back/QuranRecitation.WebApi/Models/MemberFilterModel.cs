using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class MemberFilterModel
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Sex { get; set; }
        public DateTime BirthDate { get; set; }
        public bool EnabledToAssign { get; set; }
        public bool IsSelected { get; set; }
    }
}