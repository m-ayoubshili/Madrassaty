using System;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    public class PresenceStudentSession
    {
        [Key, Column(Order = 0)]
        public int SessionId { get; set; }

        [Key, Column(Order = 1)]
        public Guid StudentId { get; set; }

        public bool Present { get; set; }

        [ForeignKey("SessionId")]
        public virtual RecitationSession SessionRecitation { get; set; }

        [ForeignKey("StudentId")]
        public virtual Member Student { get; set; }
    }
}