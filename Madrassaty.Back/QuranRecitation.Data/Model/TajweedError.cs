using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("TajweedError")]
    public class TajweedError
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int RecitationDetailId { get; set; }

        [ForeignKey("RecitationDetailId")]
        public virtual RecitationDetail RecitationDetail { get; set; }

        public int? LearningRuleId { get; set; }

        [ForeignKey("LearningRuleId")]
        public virtual LearningRule LearningRule { get; set; }

        public int? LearningSubRuleId { get; set; }

        [ForeignKey("LearningSubRuleId")]
        public virtual LearningSubRule LearningSubRule { get; set; }
    }
}