using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    public class CourseSession
    {
        public int Id { get; set; }
        public int CourseId { get; set; }

        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }
        public string Wording { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }
        public string Remarque { get; set; }

    }
}