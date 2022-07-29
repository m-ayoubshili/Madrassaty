using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class RecitationSessionResponseModel : RecitationSessionModel
    {
        public string DisciplineName { get; set; }
        public string TeacherName { get; set; }
        public virtual ICollection<string> RecitationDisciplineLevels { get; set; }
        public int TauxRemplissage { get; set; }
        public int NbStudents{ get; set; }
        public ICollection<int> LevelIds { get; set; }
        public virtual ICollection<Member> Students { get; set; }
    }
}