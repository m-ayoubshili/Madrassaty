using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("RecitationTajwidError")]
    public class RecitationTajwidError
    {
        [Key]
        public int Id { get; set; }
        public int RecitationDetailId { get; set; }
        [ForeignKey("RecitationDetailId")]
        public virtual RecitationDetail RecitationDetail { get; set; }
        public int TajwidErrorId { get; set; }
        [ForeignKey("TajwidErrorId")]
        public virtual TajwidError TajwidError { get; set; }

    }
}