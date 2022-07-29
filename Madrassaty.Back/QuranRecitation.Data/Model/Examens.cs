using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("Examen")]
    public class Examen
    {
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string Wording { get; set; }
        public Guid TeacherId { get; set; }
        public int DisciplineId { get; set; }
        public int DisciplineLevelId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool isDeleted { get; set; }
        public int? SchoolYearPeriodicityId { get; set; }
        public int SubjectId { get; set; }
        public int Coefficient { get; set; }
        [ForeignKey("TeacherId")]
        public virtual Member Teacher { get; set; }
        [ForeignKey("DisciplineId")]
        public virtual Discipline Discipline { get; set; }
        [ForeignKey("DisciplineLevelId")]
        public virtual DisciplineLevel DisciplineLevel { get; set; }
        [ForeignKey("SchoolYearPeriodicityId")]
        public virtual SchoolYearPeriodicity SchoolYearPeriodicity { get; set; }
        [ForeignKey("SubjectId")]
        public virtual Subject Subject { get; set; }
    }
}