using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class CourseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int ClassroomId { get; set; }
        public string Classroom { get; set; }

        public int SchoolYearPeriodicityId { get; set; }
        public string Periodicity { get; set; }

        public int DisciplineLevelId { get; set; }
        public string DisciplineLevel { get; set; }

        public int SubjectId { get; set; }
        public string Subject { get; set; }

        public int DisciplineId { get; set; }
        public string Discipline { get; set; }
        public string Recurrence { get; set; }

        public Guid TeacherId { get; set; }
        public string Teacher { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndTime { get; set; }

        public DateTime Begin { get; set; }
        public DateTime End { get; set; }

        public byte[] CreatedOn { get; set; }
        public string Jour { get; set; }
        public DateTime? T1 { get; set; }
        public DateTime? T2 { get; set; }
        public DateTime? T3 { get; set; }
        public int? RecurrenceId { get; set; }
        public bool DisabledToCreate { get; set; }
    }
}