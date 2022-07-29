using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class noteExamenModel
    {
        public int ExamenId { get; set; }
        public Guid StudentId { get; set; }
        public string StudentFullName { get; set; }
        public double? Note { get; set; }
        public string Observation { get; set; }
    }
}