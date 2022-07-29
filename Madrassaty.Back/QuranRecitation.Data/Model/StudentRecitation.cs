using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("StudentRecitation")]
    public class StudentRecitation
    {
        [Key, Column(Order = 0)]
        public Guid StudentId { get; set; }
        public virtual Member Student { get; set; }
        [Key, Column(Order = 1)]
        public int RecitationId { get; set; }
        public virtual RecitationSession Recitation { get; set; }
        public DateTime? StartTime { get; set; }
        [Timestamp]
        public byte[] CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}