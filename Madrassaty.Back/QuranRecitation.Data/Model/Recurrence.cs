using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace QuranRecitation.Data.Model
{
    [Table("Recurrence")]
    public class Recurrence
    {
        public int Id { get; set; }
        public string Wording { get; set; }
        public string Description { get; set; }
        [Timestamp]
        public byte[] CreatedOn { get; set; }
    }
    [DataContract(Name = "ReccurenceEnum")]
    public enum ReccurenceEnum
    {
        [Display(Name = "Pas de reccurence")]
        NoReccurence = 0,
        [Display(Name = "Journaliere")]
        Daily,
        [Display(Name = "Hebdomadaire")]
        Weekly,
        [Display(Name = "Mensuel")]
        Monthly,
        [Display(Name = "Trimestriel")]
        Quarterly,
   
    }
}