using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("MemberStates")]
    public class MemberStates
    {
        [Key]
        public int Id { get; set; }
        public string Wording { get; set; }
    }
    [DataContract(Name = "MemberStatesEnum")]
    public enum MemberStatesEnum
    {
        [Display(Name = "Inprogress")]
        Inprogress = 0,
        [Display(Name = "Approved")]
        Approved,
        [Display(Name = "Rejected")]
        Rejected,
       
    }
}