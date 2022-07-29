using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;

namespace QuranRecitation.WebApi.Controllers
{
    [Authorize]
    public class MemberStatusController : ApiController
    {
        private IMemberStatusService iMemberStatusService;

        public MemberStatusController(IMemberStatusService iMemberStatusService)
        {
            this.iMemberStatusService = iMemberStatusService;
        }

        // GET: api/MemberStatus
        [AllowAnonymous]
        public IQueryable<MemberStatus> GetMemberStatus()
        {
            return iMemberStatusService.GetAll();
        }

        // GET: api/MemberStatus/5
        [ResponseType(typeof(MemberStatus))]
        public IHttpActionResult GetMemberStatus(int id)
        {
            MemberStatus memberStatus = iMemberStatusService.GetById(id);
            if (memberStatus == null)
            {
                return NotFound();
            }

            return Ok(memberStatus);
        }

        // PUT: api/MemberStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMemberStatus(int id, MemberStatus memberStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != memberStatus.Id)
            {
                return BadRequest();
            }

            try
            {
                iMemberStatusService.Update(memberStatus);
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
        public IHttpActionResult PostMemberStatus(MemberStatus memberStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            iMemberStatusService.Create(memberStatus);

            return CreatedAtRoute("DefaultApi", new { id = memberStatus.Id }, memberStatus);
        }

        // DELETE: api/MemberStatus/5
        [ResponseType(typeof(MemberStatus))]
        public IHttpActionResult DeleteMemberStatus(int id)
        {
            MemberStatus memberStatus = iMemberStatusService.GetById(id);
            if (memberStatus == null)
            {
                return NotFound();
            }

            iMemberStatusService.Delete(memberStatus);

            return Ok(memberStatus);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        private bool MemberStatusExists(int id)
        {
            return iMemberStatusService.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}