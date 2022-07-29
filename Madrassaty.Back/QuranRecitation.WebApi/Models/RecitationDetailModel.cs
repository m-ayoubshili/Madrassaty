using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class RecitationDetailModel
    {
        public int Id { get; set; }
        public int RecitationId { get; set; }
        public Guid StudentId { get; set; }    
        public int Surah { get; set; }
        public int VerseDebut { get; set; }
        public int VerseFin { get; set; }
        public int Rating { get; set; }
        public int Remarques { get; set; }
        public DateTime DateEvaluation { get; set; }

    }
}