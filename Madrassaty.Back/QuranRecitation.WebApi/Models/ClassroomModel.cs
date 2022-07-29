using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class ClassroomModel
    {
        //
        public int Id { get; set; }
        public string Wording { get; set; }
        public int? NumberProjector { get; set; }
        public int? NumberDesk { get; set; }
        public int? NumberChair { get; set; }
    }
}