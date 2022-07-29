using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("MemberStatus")]
    public class MemberStatus
    {
        public int Id { get; set; }
        public string Wording { get; set; }
    }

    [DataContract(Name = "MemberStatusEnum")]
    public enum MemberStatusEnum
    {
        [Display(Name = "Administrateur")]
        Administrator = 0,
        [Display(Name = "Enseignant actif")]
        TeacherOn,
        [Display(Name = "Enseignant non actif")]
        TeacherOff,
        [Display(Name = "Étudiant actif")]
        StudentOn,
        [Display(Name = "Étudiant non actif")]
        StudentOff,
        [Display(Name = "Nouvelle inscription")]
        NewInscription
    }
}