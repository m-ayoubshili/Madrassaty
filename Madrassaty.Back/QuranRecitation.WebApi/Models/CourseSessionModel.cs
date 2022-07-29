using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class CourseSessionModel
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public string Course { get; set; }
        public int CourseId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public string Remarque { get; set; }
    }
}