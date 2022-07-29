using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("Message")]
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public string MessageBody { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime SendingDate { get; set; }
        public Guid SenderId { get; set; }
        [ForeignKey("SenderId")]
        public virtual Member Sender { get; set; }
        public string ReceiverId { get; set; }

        [Required] 
        public bool ToGroup { get; set; }
        public string PhotoPath { get; set; }
        // public byte[] PieceJointe { get; set; }
    }
}
