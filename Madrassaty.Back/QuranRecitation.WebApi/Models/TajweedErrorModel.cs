using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class TajweedErrorModel
    {
        public int Id { get; set; }
        public int RecitationDetailId { get; set; }
        public int? LearningRuleId { get; set; }
        public int? LearningSubRuleId { get; set; }
    }
}