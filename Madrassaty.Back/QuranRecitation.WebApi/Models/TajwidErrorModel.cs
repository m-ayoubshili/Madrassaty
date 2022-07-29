using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Models
{
    public class TajwidErrorModel
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public int? ParentId { get; set; }

        public virtual ICollection<TajwidError> children { get; set; }
    }
}