using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuranRecitation.Data.Model
{
    public class AnneeScolaire
    {
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        [Column(Order = 1)]
        public DateTime StartDay { get; set; }
        [Column(Order = 2)]
        public DateTime EndDay { get; set; }
        [Column(Order = 3)]
        public string description { get; set; }
        [Column(Order = 4)]
        public bool Actif { get; set; }
    }
}