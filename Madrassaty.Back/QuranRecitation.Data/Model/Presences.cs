using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("Presences")]
    public class Presences
    {
        [Key, Column(Order = 0)]
        public int CourseId { get; set; }

        [Key, Column(Order = 1)]
        public Guid StudentId { get; set; }

        public bool Present { get; set; }

        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }

        [ForeignKey("StudentId")]
        public virtual Member Student { get; set; }
    }
}