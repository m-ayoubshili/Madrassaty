using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("TajwidError")]
    public class TajwidError
    {
        [Key]
        public int Id { get; set; }
        public string Wording { get; set; }
        public virtual ICollection<TajwidError> children { get; set; }
        public int? ParentId { get; set; }
        [ForeignKey("ParentId")]
        public virtual TajwidError Parent { get; set; }

    }
}