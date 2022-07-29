using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    public class Assiduite
    {
        [Key, Column(Order = 0)]
        public int CourseSessionId { get; set; }

        [Key, Column(Order = 1)]
        public Guid StudentId { get; set; }

        public bool Present { get; set; }

        [ForeignKey("CourseSessionId")]
        public virtual Course CourseSession { get; set; }

        [ForeignKey("StudentId")]
        public virtual Member Student { get; set; }
    }
}