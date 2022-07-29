using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace QuranRecitation.Data.Model
{
    [Table("MemberMessageGroup")]
    public class MemberMessageGroup
    {
       
       public int MessageGroupId { get; set; }
       public MessageGroup MessageGroup { get; set;}
       public Guid MemberId { get; set; }
       public Member Member { get; set; }

    }
}
