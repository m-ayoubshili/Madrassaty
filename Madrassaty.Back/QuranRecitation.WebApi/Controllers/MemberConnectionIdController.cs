using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using QuranRecitation.WebApi.Utils;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuranRecitation.WebApi.Controllers
{
    [RoutePrefix("api/MemberConnectionId")]
    public class MemberConnectionIdController: ApiController
    {
        private readonly IMemberConnectionIdService _memberConnectionIdService;
        
        public MemberConnectionIdController(IMemberConnectionIdService memberConnectionIdService)
        {
            _memberConnectionIdService = memberConnectionIdService;
        }
        [Route("All")]
        public HttpResponseMessage GetAll()
        {
            var MappingList = _memberConnectionIdService.GetAll().ToList().AsQueryable();
            return Request.CreateResponse(HttpStatusCode.OK, MappingList);
        }
        [ResponseType(typeof(MemberConnectionId))]
        public HttpResponseMessage PostMemberConnectionId(MemberConnectionId mapConnIdUId)
        {
            var exist = _memberConnectionIdService.GetByUserId(mapConnIdUId.MemberId);
            try
            {
                if (exist == null)
                {
                    _memberConnectionIdService.Create(mapConnIdUId);
                    return Request.CreateResponse(HttpStatusCode.OK, mapConnIdUId);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
        public HttpResponseMessage PutMemberConnectionId(MemberConnectionId mapConnIdUId)
        {
            var exist = _memberConnectionIdService.GetByUserId(mapConnIdUId.MemberId);
            try
            {
                if (exist == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                else
                {
                    _memberConnectionIdService.Update(mapConnIdUId);
                    return Request.CreateResponse(HttpStatusCode.OK, mapConnIdUId);
                }

            }catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [Route("UserId/{userId}")]
        public HttpResponseMessage GetByUserId(string userId)
        {
            try
            {
                var mapping = _memberConnectionIdService.GetByUserId(userId);
                if (mapping != null)
                    return Request.CreateResponse(HttpStatusCode.OK, mapping);
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound);
            }catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
        [Route("ConnectionId/{connId}")]
        public HttpResponseMessage GetByConnId(string connId)
        {
            try
            {
                var mapping = _memberConnectionIdService.GetByConnId(connId);
                if (mapping != null)
                    return Request.CreateResponse(HttpStatusCode.OK, mapping);
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}