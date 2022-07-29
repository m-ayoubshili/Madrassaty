using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("VacanceScolaire")]
    public class VacanceScolaire
    {
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        [Column(Order = 1)]
        public DateTime StartDay { get; set; }
        [Column(Order = 2)]
        public DateTime EndDay { get; set; }
        [Column(Order = 3)]
        public string description { get; set; }
        
    }
}