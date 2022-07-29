using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("DisciplineLevel")]
    public class DisciplineLevel
    {
        public int Id { get; set; }
        public int DisciplineId { get; set; }
        [ForeignKey("DisciplineId")]
        public virtual Discipline Discipline { get; set; }
        public string Wording { get; set; }
        public string Description { get; set; }

        public virtual ICollection<StudentDisciplineLevel> StudentDisciplineLevels { get; set; }
    }
}