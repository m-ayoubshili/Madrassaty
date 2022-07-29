using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class PeriodicityModel
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int SchoolYearId { get; set; }
    }
}