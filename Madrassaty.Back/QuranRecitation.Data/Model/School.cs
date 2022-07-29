using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    [Table("School")]
    public class School
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        [Index("SchoolName_Index", IsUnique = true)]
        public string Name { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Photo { get; set; }
        public string SocietyName { get; set; }
        [MaxLength(14)]
        public string SiretCode { get; set; }
        [MaxLength(13)]
        public string NumTVA { get; set; }
        public string PhotoPath { get; set; }

    }
}