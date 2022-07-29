using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class RecitationSessionPostModel : RecitationSessionModel
    {
        public ICollection<int> LevelIds { get; set; }
    }
}