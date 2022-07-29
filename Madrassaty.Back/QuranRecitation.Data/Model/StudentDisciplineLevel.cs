using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("StudentDisciplineLevel")]
    public class StudentDisciplineLevel
    {
        [Key, Column(Order = 0)]
        public Guid StudentId { get; set; }
        public virtual Member Student { get; set; }

        [Key, Column(Order = 1)]
        public int DisciplineId { get; set; }
        public virtual Discipline Discipline { get; set; }


        public int DisciplineLevelId { get; set; }
        public virtual DisciplineLevel DisciplineLevel { get; set; }
    }
}