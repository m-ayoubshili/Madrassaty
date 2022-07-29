using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class StudentRecitationModel
    {
        public string StudentId { get; set; }
        public int RecitationId { get; set; }
        public string StartTime { get; set; }
        public byte[] CreatedOn { get; set; }
        public string ModifiedOn { get; set; }
    }
}