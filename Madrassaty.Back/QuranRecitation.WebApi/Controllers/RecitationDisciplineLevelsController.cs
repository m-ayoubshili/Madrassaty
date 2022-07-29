using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Utils;
using QuranRecitation.WebApi.Models;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class RecitationDisciplineLevelsController : ApiController
    {
        private readonly IRecitationDisciplineLevelService _recitationDisciplineLevelService;

        public RecitationDisciplineLevelsController(IRecitationDisciplineLevelService recitationDisciplineLevelService)
        {
            _recitationDisciplineLevelService = recitationDisciplineLevelService;
        }

        // GET: api/RecitationDisciplineLevels
        public IQueryable<RecitationDisciplineLevel> GetDisciplineLevels()
        {
            var recitationlevels = _recitationDisciplineLevelService.GetAll().ToList();
            return recitationlevels.Select(x => new RecitationDisciplineLevel()
            {
               DisciplineLevelId=x.DisciplineLevelId,
               DisciplineLevel=x.DisciplineLevel,
               RecitationId=x.RecitationId,

            }).AsQueryable();
        }

        [AllowAnonymous]
        public IQueryable<RecitationDisciplineLevelModel> GetDisciplineLevelsByRecitationId(int RecitationId)
        {
            var recitationlevels = _recitationDisciplineLevelService.GetAll().Where(x => x.RecitationId == RecitationId).ToList();
            return recitationlevels.Select(x => new RecitationDisciplineLevelModel()
            {
                DisciplineLevelId = x.DisciplineLevelId,
                RecitationId = x.RecitationId,
                DisciplineLevelDescription = x.DisciplineLevel.Description,
            }).AsQueryable(); 

        }


    }
}