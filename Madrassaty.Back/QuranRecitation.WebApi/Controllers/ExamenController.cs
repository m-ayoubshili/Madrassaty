using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class ExamenController : ApiController
    {
        private readonly IExamenService _examenService;
        private readonly IMemberService _memberService;
        private readonly IExamenNotesService _examenNotesService;
        private readonly IAnneeScolaireService _anneeScolairesService;
        private readonly IStudentDisciplineLevelService _studentDisciplineLevelService;

        public ExamenController(IExamenService examenService,
                                IMemberService memberService,
                                IExamenNotesService examenNotesService,
                                IAnneeScolaireService anneeScolairesService,
                                IStudentDisciplineLevelService studentDisciplineLevelService)
        {
            _examenService = examenService;
            _memberService = memberService;
            _examenNotesService = examenNotesService;
            _anneeScolairesService = anneeScolairesService;
            _studentDisciplineLevelService = studentDisciplineLevelService;
        }

        
        [HttpGet, Route("api/Examen/")]
        public IQueryable<ExamenModel> GetExamens(string userName)
        {
        

            var currentUser = _memberService.GetAll().Where(x => x.UserName == userName).FirstOrDefault();
            var anneeScolaire = _anneeScolairesService.GetAll().Where(x => x.Actif == true).FirstOrDefault();

            var examens = new List<Examen>();
            if (currentUser.MemberStatus.Id == 1) //Administrateur
            {
                examens = _examenService.GetAll().Where(x => x.StartDate > anneeScolaire.StartDay && x.EndDate < anneeScolaire.EndDay && x.isDeleted != true).ToList();
            }
            else if (currentUser.MemberStatus.Id == 2 || currentUser.MemberStatus.Id == 3) //Enseignant actif
            {
                examens = _examenService.GetAll().Where(x => x.StartDate > anneeScolaire.StartDay && x.EndDate < anneeScolaire.EndDay && x.isDeleted != true && x.TeacherId == currentUser.Id).ToList();
            }
            else if (currentUser.MemberStatus.Id == 4 || currentUser.MemberStatus.Id == 5) //Étudiant actif
            {
                var levels = _studentDisciplineLevelService.GetAll().Where(x => x.StudentId == currentUser.Id).Select(x => x.DisciplineLevelId).ToList();
                examens = _examenService.GetAll().Where(x => x.StartDate > anneeScolaire.StartDay && x.EndDate < anneeScolaire.EndDay && x.isDeleted != true && levels.Contains(x.DisciplineLevelId)).ToList();
            }

            var models = new List<ExamenModel>();

            foreach (var examen in examens)
            {
                models.Add(EntityToModelMapping(examen));
            }

            if (currentUser.MemberStatus.Id == 4 || currentUser.MemberStatus.Id == 5) //Étudiant actif
            {
                int i = 0;
                foreach (var examen in models)
                {
                    var note = _examenNotesService.GetAll().Where(x => x.StudentId == currentUser.Id && x.ExamenId == examen.Id).FirstOrDefault();
                    models[i].Note = note != null ? (double?)note.Note : null;
                    i++;
                }
            }

            return models.AsQueryable();
        }

        // GET: api/Examens/5
        [ResponseType(typeof(ExamenModel))]
        public HttpResponseMessage GetExamen(int id)
        {
            var examen = _examenService.GetById(id);
            if (examen != null)
            {
                var model = EntityToModelMapping(examen);
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/Examens/5
        [ResponseType(typeof(ExamenModel))]
        public HttpResponseMessage PutExamen(int id, ExamenModel model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                try
                {
                    var examen = ModelToEntityMapping(model);
                    _examenService.Update(examen);

                    Examen examennnnn = _examenService.GetById(examen.Id);
                    model = EntityToModelMapping(examen);
                    return Request.CreateResponse(HttpStatusCode.OK, model);
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST: api/Examens
        [ResponseType(typeof(ExamenModel))]
        public HttpResponseMessage PostExamen(ExamenModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var examen = ModelToEntityMapping(model);
                    _examenService.Create(examen);
                    model = EntityToModelMapping(examen);
                }
                catch (Exception)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, model);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = model.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE: api/Examens/5
        [ResponseType(typeof(Examen))]
        public HttpResponseMessage DeleteExamen(int id)
        {
            var examen = _examenService.GetById(id);

            if (examen == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            try
            {
                examen.isDeleted = true;
                _examenService.Update(examen);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, examen);
        }

        #region Mapping
        [NonAction]
        private ExamenModel EntityToModelMapping(Examen examen)
        {
            return new ExamenModel()
            {
                Id = examen.Id,
                Wording = examen.Wording,
                DisciplineLevelId = examen.DisciplineLevelId,
                Discipline = (examen.DisciplineLevel != null && examen.DisciplineLevel.Discipline != null) ? examen.DisciplineLevel.Discipline.Wording : "",
                DisciplineId = (examen.DisciplineLevel != null && examen.DisciplineLevel.Discipline != null) ? examen.DisciplineLevel.Discipline.Id : 0,
                DisciplineLevel = examen.DisciplineLevel != null ? examen.DisciplineLevel.Wording : "",
                TeacherId = examen.TeacherId,
                Teacher = examen.Teacher != null ? examen.Teacher.FullName : "",
                StartDate = examen.StartDate,
                EndDate = examen.EndDate,
                BeginTime = examen.StartDate,
                EndTime = examen.EndDate,
                SchoolYearPeriodicity = examen.SchoolYearPeriodicity != null ? examen.DisciplineLevel.Discipline.Wording : "",
                SchoolYearPeriodicityId = examen.SchoolYearPeriodicityId != null ? examen.SchoolYearPeriodicityId : 0,
                Subject = examen.Subject != null ? examen.Subject.Name : "",
                SubjectId = examen.Subject != null ? examen.SubjectId : 0,
                Coefficient = examen.Coefficient > 0 ? examen.Coefficient : 1

            };
        }

        [NonAction]
        private Examen ModelToEntityMapping(ExamenModel model)
        {
            return new Examen()
            {
                Id = model.Id,
                Wording = model.Wording,
                DisciplineId = model.DisciplineId,
                DisciplineLevelId = model.DisciplineLevelId,
                TeacherId = model.TeacherId,
                StartDate = model.StartDate.Date.AddHours(model.BeginTime.Hour).AddMinutes(model.BeginTime.Minute).AddSeconds(0),
                EndDate = model.StartDate.Date.AddHours(model.EndTime.Hour).AddMinutes(model.EndTime.Minute).AddSeconds(0),
                SchoolYearPeriodicityId = model.SchoolYearPeriodicityId,
                SubjectId = model.SubjectId,
                Coefficient = (model.Coefficient > 0) ? model.Coefficient : 1

            };
        }
        #endregion
    }
}
