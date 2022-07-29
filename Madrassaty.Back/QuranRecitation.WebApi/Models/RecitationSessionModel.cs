using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class RecitationSessionModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsSaved { get; set; }
        public Guid TeacherId { get; set; }
        public int ClassroomId { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }
        public int DivisionParam { get; set; }
        public byte[] CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int? RecurrenceId { get; set; }
        public int DisciplineId { get; set; }
        public string TypeEvaluation { get; set; }
        public string Jour { get; set; }
        public DateTime? T1 { get; set; }
        public DateTime? T2 { get; set; }
        public DateTime? T3 { get; set; }
        
        public ICollection<Guid> IdStudents { get; set; }
    }
}



