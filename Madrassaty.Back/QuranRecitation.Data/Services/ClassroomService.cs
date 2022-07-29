using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.Data.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly IClassroomRepository _classroomRepo;

        public ClassroomService(IClassroomRepository classroomRepo)
        {
            _classroomRepo = classroomRepo;
        }

        public IQueryable<Classroom> GetAll()
        {
            return _classroomRepo.GetAll();
        }

        public Classroom GetById(int id)
        {
            return _classroomRepo.GetById(id);
        }

        public Classroom Create(Classroom classroom)
        {
            return _classroomRepo.Create(classroom);
        }

        public void Update(Classroom classroom)
        {
            _classroomRepo.Update(classroom);
        }

        public void Delete(Classroom classroom)
        {
            _classroomRepo.Delete(classroom);
        }
    }

    public interface IClassroomService
    {
        IQueryable<Classroom> GetAll();
        Classroom GetById(int id);
        Classroom Create(Classroom classroom);
        void Update(Classroom classroom);
        void Delete(Classroom classroom);
    }
}