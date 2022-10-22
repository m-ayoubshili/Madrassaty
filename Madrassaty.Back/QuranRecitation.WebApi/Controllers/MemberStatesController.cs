using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;

namespace QuranRecitation.WebApi.Controllers
{
    public class MemberStatesController : ApiController
    {
        private IMemberStatesService iMemberStatesService;
        public MemberStatesController(IMemberStatesService iMemberStatesService)
        {
            this.iMemberStatesService = iMemberStatesService;
        }
        // GET: api/MemberStates
        [AllowAnonymous]
        public IQueryable<MemberStates> GetMemberStates()
        {
            return iMemberStatesService.GetAll();
        }

        // GET: api/MemberStates/5
        [ResponseType(typeof(MemberStates))]
        public IHttpActionResult GetMemberStates(int id)
        {
            MemberStates memberStates = iMemberStatesService.GetById(id);
            if (memberStates == null)
            {
                return NotFound();
            }

            return Ok(memberStates);
        }

        // PUT: api/MemberStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMemberStatus(int id, MemberStates memberStates)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != memberStates.Id)
            {
                return BadRequest();
            }

            try
            {
                iMemberStatesService.Update(memberStates);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberStatusExists(id))
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

        // POST: api/MemberStatus
        [ResponseType(typeof(MemberStatus))]
        public IHttpActionResult PostMemberStatus(MemberStates memberStates)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            iMemberStatesService.Create(memberStates);

            return CreatedAtRoute("DefaultApi", new { id = memberStates.Id }, memberStates);
        }

        // DELETE: api/MemberStatus/5
        [ResponseType(typeof(MemberStatus))]
        public IHttpActionResult DeleteMemberStatus(int id)
        {
            MemberStates memberStates = iMemberStatesService.GetById(id);
            if (memberStates == null)
            {
                return NotFound();
            }

            iMemberStatesService.Delete(memberStates);

            return Ok(memberStates);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        private bool MemberStatusExists(int id)
        {
            return iMemberStatesService.GetAll().Count(e => e.Id == id) > 0;
        }


    }
}
