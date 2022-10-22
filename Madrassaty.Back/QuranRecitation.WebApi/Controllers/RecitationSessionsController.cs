using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using System;
using Microsoft.AspNet.Identity;
using System.Web;
using QuranRecitation.WebApi.Models;
using System.Collections.Generic;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class RecitationSessionsController : ApiController
    {
        private IRecitationSessionService iRecitationSessionService;
        private IStudentRecitationService iStudentRecitationService;
        private IRecitationDisciplineLevelService iRecitationDisciplineLevelService;
        private IStudentDisciplineLevelService iStudentDisciplineLevelService;


        public RecitationSessionsController(IRecitationSessionService iRecitationSessionService,
                                            IStudentRecitationService iStudentRecitationService,
                                            IRecitationDisciplineLevelService iRecitationDisciplineLevelService,
                                             IStudentDisciplineLevelService iStudentDisciplineLevelService)
        {
            this.iRecitationSessionService = iRecitationSessionService;
            this.iStudentRecitationService = iStudentRecitationService;
            this.iRecitationDisciplineLevelService = iRecitationDisciplineLevelService;
            this.iStudentDisciplineLevelService = iStudentDisciplineLevelService;

        }
        
        // GET: api/RecitationSessions
        public IQueryable<RecitationSessionResponseModel> GetRecitationSessions()
        {
            String userId = HttpContext.Current.User.Identity.GetUserId();
            List<RecitationSessionResponseModel> listToReturn = new List<RecitationSessionResponseModel>();
            // var listOfSessionRecitation = iRecitationSessionService.GetAll().Where(rs => rs.TeacherId.ToString() == userId).ToList().AsQueryable();
            var listOfSessionRecitation = iRecitationSessionService.GetAll().ToList().AsQueryable();

            foreach (var item in listOfSessionRecitation)
            {

                var listOfSessionRecitationLevels = iRecitationDisciplineLevelService.GetAll().Where(x => x.RecitationId == item.Id);
                List<string> DisciplineLevels = listOfSessionRecitationLevels.Select(x => x.DisciplineLevel.Wording).ToList();  //new List<string>(); 
                var students = iStudentRecitationService.GetAll().Where(x => x.RecitationId == item.Id).ToList();
                
                //foreach (var listOfSessionRecitationLevelItem in listOfSessionRecitationLevels)
                //{
                //    DisciplineLevels.Add(listOfSessionRecitationLevelItem.DisciplineLevel.Wording);
                //}​
                var RecitationSessionTime = (item.EndTime - item.StartDate).TotalMinutes;
                var MaxStudents = (int)RecitationSessionTime / item.DivisionParam;
                var TauxRemplissage = (students.Count * 100) / MaxStudents;
                
                listToReturn.Add(new RecitationSessionResponseModel
                {
                    ClassroomId = item.ClassroomId,
                    CreatedOn = item.CreatedOn,
                    Description = item.Description,
                    DivisionParam = item.DivisionParam,
                    IsSaved = item.IsSaved,
                    Title = item.Title,
                    Id = item.Id,
                    TeacherId = item.TeacherId,
                    TeacherName = item.Teacher.FullName,
                    StartDate = item.StartDate,
                    RecurrenceId = item.RecurrenceId,
                    ModifiedOn = item.ModifiedOn,
                    EndTime = item.EndTime,
                    //LevelIds = DisciplineLevels,
                    IdStudents = item.IdStudents,
                    Students = new List<Member>(),
                    NbStudents = students.Count,
                    DisciplineName = item.Discipline.Description,
                    TauxRemplissage = TauxRemplissage,
                    RecitationDisciplineLevels = DisciplineLevels,
                    TypeEvaluation = item.TypeEvaluation,
                    Jour = item.Jour,
                    T1 = item.T1,
                    T2 = item.T2,
                    T3 = item.T3
                });
            }
            return listToReturn.ToList().AsQueryable();
            
        }
        
        // GET: api/RecitationSessions/5
        [ResponseType(typeof(RecitationSession))]
        public IHttpActionResult GetRecitationSession(int id)
        {
            RecitationSession discipline = iRecitationSessionService.GetById(id);
            if (discipline == null)
            {
                return NotFound();
            }
            
            return Ok(discipline);
        }
        
        // PUT: api/RecitationSessions/5
        [ResponseType(typeof(void))]
        
        public IHttpActionResult PutRecitationSession(int id, RecitationSessionPostModel recitationSessionToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var recitaionPutModel = new RecitationSessionPostModel();
            
            if (id != recitationSessionToUpdate.Id)
            {
                return BadRequest();
            }
            
            var recitationSessionTime = (recitationSessionToUpdate.EndTime - recitationSessionToUpdate.StartDate).TotalMinutes;
            if (recitationSessionTime < recitationSessionToUpdate.DivisionParam)
            {
                return BadRequest();
            }
            
            var recitationSessionModel = new RecitationSession();
            recitationSessionModel = iRecitationSessionService.GetById(id);
            recitationSessionModel.Title = recitationSessionToUpdate.Title;
            recitationSessionModel.IsSaved = recitationSessionToUpdate.IsSaved;
            recitationSessionModel.TeacherId = recitationSessionToUpdate.TeacherId;
            recitationSessionModel.ClassroomId = recitationSessionToUpdate.ClassroomId;
            recitationSessionModel.Description = recitationSessionToUpdate.Description;
            recitationSessionModel.StartDate = recitationSessionToUpdate.StartDate;
            recitationSessionModel.EndTime = recitationSessionToUpdate.EndTime;
            recitationSessionModel.DivisionParam = recitationSessionToUpdate.DivisionParam;
            recitationSessionModel.ModifiedOn = DateTime.Now;
            recitationSessionModel.DisciplineId = recitationSessionToUpdate.DisciplineId;
            recitationSessionModel.RecurrenceId = recitationSessionToUpdate.RecurrenceId;
            recitationSessionModel.IdStudents = recitationSessionToUpdate.IdStudents;
            recitationSessionModel.TypeEvaluation = recitationSessionToUpdate.TypeEvaluation;
            recitationSessionModel.Jour = recitationSessionToUpdate.Jour;
            recitationSessionModel.T1 = recitationSessionToUpdate.T1;
            recitationSessionModel.T2 = recitationSessionToUpdate.T2;
            recitationSessionModel.T3 = recitationSessionToUpdate.T3;
            if (recitationSessionToUpdate.LevelIds != null)
            {
                var listOfRecitationDisciplineLevel = iRecitationDisciplineLevelService.GetAll().ToList().AsQueryable();
                foreach (var rdlItem in listOfRecitationDisciplineLevel)
                {
                    if (rdlItem.RecitationId == id)
                    {
                        iRecitationDisciplineLevelService.Delete(rdlItem);
                    }
                }
                
                foreach (var item in recitationSessionToUpdate.LevelIds)
                {
                    iRecitationDisciplineLevelService.Create(new RecitationDisciplineLevel() { RecitationId = recitationSessionToUpdate.Id, DisciplineLevelId = item });
                }
            }
            
            try
            {
                
                iRecitationSessionService.Update(recitationSessionModel);
            }
            catch (DbUpdateConcurrencyException)
            {
                
                if (!RecitationSessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            
            return StatusCode(HttpStatusCode.NoContent);
        }
        
        // POST: api/RecitationSessions
        [ResponseType(typeof(RecitationSessionPostModel))]
        public IHttpActionResult PostRecitationSession(RecitationSessionPostModel recitationSessionPost)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var recitationSessionTime = (recitationSessionPost.EndTime - recitationSessionPost.StartDate).TotalMinutes;
            if (recitationSessionTime < recitationSessionPost.DivisionParam)
            {
                return BadRequest();
            }
            
            RecitationSession recitationSession = new RecitationSession();
            recitationSession.Title = recitationSessionPost.Title;
            recitationSession.IsSaved = recitationSessionPost.IsSaved;
            recitationSession.TeacherId = recitationSessionPost.TeacherId;
            recitationSession.ClassroomId = recitationSessionPost.ClassroomId;
            recitationSession.Description = recitationSessionPost.Description;
            recitationSession.StartDate = recitationSessionPost.StartDate;
            recitationSession.EndTime = recitationSessionPost.EndTime;
            recitationSession.DivisionParam = recitationSessionPost.DivisionParam;
            recitationSession.ModifiedOn = DateTime.Now;
            recitationSession.RecurrenceId = recitationSessionPost.RecurrenceId;
            recitationSession.IdStudents = recitationSessionPost.IdStudents;
            recitationSession.DisciplineId = recitationSessionPost.DisciplineId;
            recitationSession.TypeEvaluation = recitationSessionPost.TypeEvaluation;
            recitationSession.Jour = recitationSessionPost.Jour;
            recitationSession.T1 = recitationSessionPost.T1;
            recitationSession.T2 = recitationSessionPost.T2;
            recitationSession.T3 = recitationSessionPost.T3;
            TimeSpan span = new TimeSpan(DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second, DateTime.Now.Millisecond);
            long c = span.Ticks;
            recitationSession.CreatedOn = BitConverter.GetBytes(c);
            var rs = iRecitationSessionService.Create(recitationSession);
            var ListStudentLevel = iStudentDisciplineLevelService.GetAll().ToList().AsQueryable();



            if (recitationSessionPost.LevelIds != null)
            {
                //foreach (var item in recitationSessionPost.LevelIds)
                //{
                //    iRecitationDisciplineLevelService.Create(new RecitationDisciplineLevel() { RecitationId = rs.Id, DisciplineLevelId = item });

                //}
                foreach(var item in recitationSessionPost.LevelIds)
                {
                    iRecitationDisciplineLevelService.Create(new RecitationDisciplineLevel() { RecitationId = rs.Id, DisciplineLevelId = item });
                    if (ListStudentLevel !=null)
                    {
                        var slottime = rs.StartDate;
                        foreach (var aux in ListStudentLevel)
                        {
                            if (aux.DisciplineLevelId == item)
                            {
                                iStudentRecitationService.Create(new StudentRecitation()
                                {
                                    StudentId = aux.StudentId,
                                    RecitationId = rs.Id,
                                    StartTime = slottime,
                                    CreatedOn = rs.CreatedOn,
                                    ModifiedOn = rs.ModifiedOn,


                                }

                                    );
                                slottime = slottime.AddMinutes(rs.DivisionParam);
                            }
                        }
                    }
                    

                }
            }
            
            return CreatedAtRoute("DefaultApi", new { id = recitationSession.Id }, recitationSession);
        }
        
        // DELETE: api/RecitationSessions/5
        [ResponseType(typeof(RecitationSession))]
        public IHttpActionResult DeleteRecitationSession(int id)
        {
            RecitationSession recitationSession = iRecitationSessionService.GetById(id);
            if (recitationSession == null)
            {
                return NotFound();
            }
            var listOfRecitationDisciplineLevel = iRecitationDisciplineLevelService.GetAll().Where(x=>x.RecitationId==id).ToList().AsQueryable();
            foreach (var rdlItem in listOfRecitationDisciplineLevel)
            {
                if (rdlItem.RecitationId == id)
                {
                    iRecitationDisciplineLevelService.Delete(rdlItem);
                }
            }

            var listOfRecitationStudent = iStudentRecitationService.GetAll().Where(x => x.RecitationId == id).ToList().AsQueryable();
            foreach (var rdlItem in listOfRecitationStudent)
            {
                if (rdlItem.RecitationId == id)
                {
                    iStudentRecitationService.Delete(rdlItem);
                }
            }

            iRecitationSessionService.Delete(recitationSession);
            
            return Ok(recitationSession);
        }
        
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
        
        private bool RecitationSessionExists(int id)
        { 
            return iRecitationSessionService.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}




