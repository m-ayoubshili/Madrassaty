using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("ExamenNotes")]
    public class ExamenNotes
    {
        [Key, Column(Order = 0)]
        public int ExamenId { get; set; }

        [Key, Column(Order = 1)]
        public Guid StudentId { get; set; }

        public double Note { get; set; }
        public string Observation { get; set; }

        [ForeignKey("ExamenId")]
        public virtual Examen Examen { get; set; }

        [ForeignKey("StudentId")]
        public virtual Member Student { get; set; }
    }
}