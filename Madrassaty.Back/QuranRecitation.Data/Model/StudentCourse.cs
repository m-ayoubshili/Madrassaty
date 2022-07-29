using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("StudentCourse")]
    public class StudentCourse
    {
        [Key, Column(Order = 0)]
        public Guid StudentId { get; set; }
        public virtual Member Student { get; set; }
        [Key, Column(Order = 1)]
        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}