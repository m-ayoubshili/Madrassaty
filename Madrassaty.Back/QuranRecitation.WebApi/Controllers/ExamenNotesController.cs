using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class ExamenNotesController : ApiController
    {
        private readonly IExamenNotesService _examenNotesService;
        private readonly IDisciplineLevelService _disciplineLevelService;

        public ExamenNotesController(   IExamenNotesService examenNotesService, 
                                        IDisciplineLevelService disciplineLevelService)
        {
            _examenNotesService = examenNotesService;
            _disciplineLevelService = disciplineLevelService;
        }

        // GET: api/ExamenNotes
        public IQueryable<noteExamenModel> GetExamenNotes(int examenId, int DisciplineId, int LevelId)
        {
            var members = _disciplineLevelService.GetStudentsByCourse(LevelId, DisciplineId).ToList();
            var notes = new List<noteExamenModel>();
            foreach (var member in members)
            {
                var note = _examenNotesService.GetAll().Where(x => x.ExamenId == examenId && x.StudentId == member.Id).FirstOrDefault();
                var model = new noteExamenModel
                {
                    ExamenId = examenId, 
                    StudentId = member.Id, 
                    StudentFullName =  member.FullName, 
                    Note = note ==  null? null : (double?) note.Note, 
                    Observation = note == null ? string.Empty : note.Observation,
                };

                notes.Add(model); 
            }
            return notes.AsQueryable(); 
        }

        // PUT: api/ExamenNotes/5
        [ResponseType(typeof(ExamenNotes))]
        public HttpResponseMessage PutExamenNotes(ExamenNotes model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var existingNote = _examenNotesService.GetAll().Where(x => x.ExamenId == model.ExamenId && x.StudentId == model.StudentId).FirstOrDefault();
                    if (existingNote == null)
                        _examenNotesService.Create(model);
                    else
                    {
                        existingNote.Note = model.Note;
                        existingNote.Observation = model.Observation; 
                        _examenNotesService.Update(existingNote);
                    }


                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/ExamenNotes
        [ResponseType(typeof(ExamenNotes))]
        public HttpResponseMessage PostExamenNotes(ExamenNotes model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _examenNotesService.Create(model);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/ExamenNotes/5
        [ResponseType(typeof(ExamenNotes))]
        public HttpResponseMessage DeleteExamenNotes(int id)
        {
            var examenNotes = _examenNotesService.GetById(id);

            if (examenNotes == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                _examenNotesService.Delete(examenNotes);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, examenNotes);
        }
    }
}
