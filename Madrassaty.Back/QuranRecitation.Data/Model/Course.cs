using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("Course")]
    public class Course
    {
        public int Id { get; set; }
        public int ClassroomId { get; set; }
        [ForeignKey("ClassroomId")]
        public virtual Classroom Classroom { get; set; }
        public int DisciplineLevelId { get; set; }
        [ForeignKey("DisciplineLevelId")]
        public virtual DisciplineLevel DisciplineLevel { get; set; }
        [ForeignKey("Teacher")]
        public Guid TeacherId { get; set; }
        public virtual Member Teacher { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }
        [Timestamp]
        public byte[] CreatedOn { get; set; }
        public string Jour { get; set; }
        public DateTime? T1 { get; set; }
        public DateTime? T2 { get; set; }
        public DateTime? T3 { get; set; }
        public int? RecurrenceId { get; set; }
        [ForeignKey("RecurrenceId")]
        public virtual Recurrence Recurrence { get; set; }

    }
}