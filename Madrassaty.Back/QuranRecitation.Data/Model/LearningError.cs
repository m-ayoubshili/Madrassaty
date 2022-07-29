using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("LearningError")]
    public class LearningError
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(Order = 1)]
        public int RecitationDetailId { get; set; }

        [ForeignKey("RecitationDetailId")]
        public virtual RecitationDetail RecitationDetail { get; set; }

        public string Wording { get; set; }
    }
}