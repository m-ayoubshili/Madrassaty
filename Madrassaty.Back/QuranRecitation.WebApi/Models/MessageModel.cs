using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class MessageModel
    {
        public int Id { get; set; }
        public string MessageBody { get; set; }
        public DateTime? Date { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public bool ToGroup { get; set; }
        public string PhotoPath { get; set; }
        // public HttpPostedFileBase PieceJointe { get; set; }
    }
    public class MessageModelWithFile
    {
        public MessageModel message { get; set; }
        public string PhotoBytes { get; set; }
    }
}