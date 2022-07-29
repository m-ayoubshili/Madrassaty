using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("MoutounSession")]
    public class MoutounSession
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public Guid StudentId { get; set; }
        public Guid TeacherId { get; set; }
        public int MoutounId { get; set; }

        [ForeignKey("StudentId")]
        public virtual Member Student { get; set; }

        [ForeignKey("TeacherId")]
        public virtual Member Teacher { get; set; }

        [ForeignKey("MoutounId")]
        public virtual Moutoun Moutoun { get; set; }
    }
}