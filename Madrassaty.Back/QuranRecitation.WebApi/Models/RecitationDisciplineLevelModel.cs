using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class RecitationDisciplineLevelModel
    {
        public int RecitationId { get; set; }
        public int DisciplineLevelId { get; set; }
        public string DisciplineLevelDescription { get; set; }
    }
}