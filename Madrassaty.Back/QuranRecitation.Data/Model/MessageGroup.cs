using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace QuranRecitation.Data.Model
{
    [Table("MessageGroup")]
    public class MessageGroup
    {
        public MessageGroup()
        {
            this.MemberMessageGroup = new HashSet<MemberMessageGroup>();
        }
        [Key]
        public int MessageGroupId { get; set; }

        public string Name { get; set; }
        public virtual ICollection<MemberMessageGroup> MemberMessageGroup{ get; set; }

    }
}
