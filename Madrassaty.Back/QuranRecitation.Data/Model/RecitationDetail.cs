using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("RecitationDetail")]
    public class RecitationDetail
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(Order = 1)]
        public int RecitationId { get; set; }

        [ForeignKey("RecitationId")]
        public virtual RecitationSession RecitationSession { get; set; }

        public Guid StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual Member Student { get; set; }
        public int Surah { get; set; }
        public int VerseDebut { get; set; }
        public int VerseFin { get; set; }
        public int Rating { get; set; }
        public string Remarques { get; set; }
        public DateTime DateEvaluation { get; set; }
    }
}