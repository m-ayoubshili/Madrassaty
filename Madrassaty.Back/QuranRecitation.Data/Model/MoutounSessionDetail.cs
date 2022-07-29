using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Model
{
    [Table("MoutounSessionDetail")]
    public class MoutounSessionDetail
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int StartVerdict { get; set; }

        [Required]
        public int EndVerdict { get; set; }

        [Required]
        public int MoutounSessionId { get; set; }

        [ForeignKey("MoutounSessionId")]
        public virtual MoutounSession MoutounSession { get; set; }

    }
}