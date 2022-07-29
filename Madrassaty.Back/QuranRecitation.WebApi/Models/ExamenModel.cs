using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class ExamenModel
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public double? Note { get; set; }

        public int DisciplineLevelId { get; set; }
        public string DisciplineLevel { get; set; }

        public int DisciplineId { get; set; }
        public string Discipline { get; set; }

        public Guid TeacherId { get; set; }
        public string Teacher { get; set; }

        public int? SchoolYearPeriodicityId { get; set; }
        public string SchoolYearPeriodicity { get; set; }

        public int SubjectId { get; set; }
        public string Subject { get; set; }

        public int Coefficient { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime BeginTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}