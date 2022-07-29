using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("RecitationSession")]
    public class RecitationSession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsSaved { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }
        public int DivisionParam { get; set; }
        [Timestamp]
        public byte[] CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int? RecurrenceId { get; set; }
        public Guid TeacherId { get; set; }
        public int ClassroomId { get; set; }
        public ICollection<Guid> IdStudents { get; set; }
        public int DisciplineId { get; set; }
        public string TypeEvaluation { get; set; }
        public string Jour { get; set; }
        public DateTime? T1 { get; set; }
        public DateTime? T2 { get; set; }
        public DateTime? T3 { get; set; }

        [ForeignKey("TeacherId")]
        public virtual Member Teacher { get; set; }
        [ForeignKey("ClassroomId")]
        public virtual Classroom Classroom { get; set; }
        [ForeignKey("RecurrenceId")]
        public virtual Recurrence Recurrence { get; set; }
        [ForeignKey("DisciplineId")]
        public  virtual Discipline Discipline { get; set; }

        public virtual ICollection<Member> Students { get; set; }
    }
}