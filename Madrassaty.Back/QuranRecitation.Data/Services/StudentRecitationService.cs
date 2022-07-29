using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class StudentRecitationService : IStudentRecitationService
    {
        private readonly IStudentRecitationRepository _studentRecitationRepo;
        public StudentRecitationService(IStudentRecitationRepository studentRecitationRepo)
        {
            _studentRecitationRepo = studentRecitationRepo;
        }

        public IQueryable<StudentRecitation> GetAll()
        {
            return _studentRecitationRepo.GetAll();
        }


        public StudentRecitation Create(StudentRecitation studentRecitation)
        {
            return _studentRecitationRepo.Create(studentRecitation);
        }
    }

    public interface IStudentRecitationService
    {
        IQueryable<StudentRecitation> GetAll();
        StudentRecitation Create(StudentRecitation studentRecitation);
    }
}