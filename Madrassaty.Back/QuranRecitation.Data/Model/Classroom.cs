using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("Classroom")]
    public class Classroom
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public int? NumberProjector { get; set; }
        public int? NumberDesk { get; set; }
        public int? NumberChair { get; set; }

    }
}