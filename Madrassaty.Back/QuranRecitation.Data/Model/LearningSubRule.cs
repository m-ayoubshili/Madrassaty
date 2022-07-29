using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("LearningSubRule")]
    public class LearningSubRule
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(Order = 1)]
        public int LearningRuleId { get; set; }

        [ForeignKey("LearningRuleId")]
        public virtual LearningRule LearningRule { get; set; }

        public string Wording { get; set; }
    }
}