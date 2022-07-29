using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class MoutounSessionModel
    {
        public int Id { get; set; }

        public Guid StudentId { get; set; }
        public string StudentName { get; set; }
        public Guid TeacherId { get; set; }
        public string TeacherName { get; set; }
        public int MoutounId { get; set; }
        public string MoutounName { get; set; }
        public int progression { get; set; }
    }
}