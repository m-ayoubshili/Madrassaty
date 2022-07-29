using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class DisciplineModel
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public string Description { get; set; }
        public byte[] CreatedOn { get; set; }

        public virtual ICollection<DisciplineLevel> DisciplineLevels { get; set; }
    }
}