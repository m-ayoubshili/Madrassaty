using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class AssiduiteModel
    {
        public string MemberId { get; set; }
        public string FullName { get; set; }
        public bool? Present { get; set; }
    }
}