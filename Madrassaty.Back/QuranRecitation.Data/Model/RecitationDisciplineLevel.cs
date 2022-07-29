using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("RecitationDisciplineLevel")]
    public class RecitationDisciplineLevel
    {
        [Key, Column(Order = 0)]
        public int RecitationId { get; set; }
        public virtual RecitationSession Recitation { get; set; }
        [Key, Column(Order = 1)]
        public int DisciplineLevelId { get; set; }
        public virtual DisciplineLevel DisciplineLevel { get; set; }
    }
}