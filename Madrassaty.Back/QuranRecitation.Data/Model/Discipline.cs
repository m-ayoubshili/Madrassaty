using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("Discipline")]
    public class Discipline
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public string Description { get; set; }
        public virtual ICollection<DisciplineLevel> DisciplineLevels { get; set; }
        [Timestamp]
        public byte[] CreatedOn { get; set; }
    }
}