using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("Moutoun")]
    public class Moutoun
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(Order = 1)]
        public string Wording { get; set; }

        [Required]
        [Column(Order = 2)]
        [Range(1 , int.MaxValue, ErrorMessage = "Number of sentences must be greater than zero.")]
        public int NumberVerdict { get; set; }
    }
}