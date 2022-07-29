using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("MemberConnectionId")]
    public class MemberConnectionId
    {
        [Key]
        public string MemberId { get; set; }
        public string ConnectionId { get; set; }
    }
}