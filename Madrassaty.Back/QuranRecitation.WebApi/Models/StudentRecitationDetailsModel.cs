using QuranRecitation.Data.Model;
using System;

namespace QuranRecitation.WebApi.Models
{
    public class StudentRecitationDetailsModel : Member
    {
        public DateTime StartTime { get; set; }
        public string MemberName { get; set; }
    }
}