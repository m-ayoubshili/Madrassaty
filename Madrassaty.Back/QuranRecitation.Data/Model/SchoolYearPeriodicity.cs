using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    public class SchoolYearPeriodicity
    {
        
        public int Id { get; set; }
        public int SchoolYearId { get; set; }
        [ForeignKey("SchoolYearId")]
        public virtual AnneeScolaire SchoolYear { get; set; }
        public string Wording { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        
    }
}