using ExcelDataReader;
using Microsoft.AspNet.Identity.Owin;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Services;
using QuranRecitation.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace QuranRecitation.WebApi.Controllers
{
    public class ExcelUploadController : ApiController
    {
        private readonly IMemberService _memberService;

        public ExcelUploadController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [Route("api/UploadExcel")]
        [HttpPost]
        public async Task<string> ExcelUpload()
        {
            string message = "";
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;

           
            if (httpRequest.Files.Count > 0)
            {
                HttpPostedFile file = httpRequest.Files[0];
                Stream stream = file.InputStream;

                IExcelDataReader reader = null;

                if (file.FileName.EndsWith(".xls"))
                {
                    reader = ExcelReaderFactory.CreateBinaryReader(stream);
                }
                else if (file.FileName.EndsWith(".xlsx"))
                {
                    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                }
                else
                {
                    message = "This file format is not supported";
                }

                DataSet excelRecords = reader.AsDataSet();
                reader.Close();

                var finalRecords = excelRecords.Tables[0];
                var userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
                var ListMembers = new List<Member>();
                for (int i = 0; i < finalRecords.Rows.Count; i++)
                {
                    Guid idmember = Guid.NewGuid();
                    var member = new Member();
                    member.Id = idmember;
                    member.FirstName = finalRecords.Rows[i][0].ToString();
                    member.LastName = finalRecords.Rows[i][3].ToString();
                    member.BeginningDate = DateTime.Today;
                    member.Login = finalRecords.Rows[i][1].ToString();
                    member.MemberStatusId = 4;
                    member.PhoneNumber = finalRecords.Rows[i][4].ToString();
                    member.SchoolId = 1;
                    member.UserName= finalRecords.Rows[i][1].ToString();
                    member.BirthDate = DateTime.Today;
                    member.City = "test";
                    member.Email = finalRecords.Rows[i][1].ToString();
                    member.EmailConfirmed = true;
                    member.Gender = finalRecords.Rows[i][2].ToString();
                    member.Country = "France";
                    member.SecurityStamp = Guid.NewGuid().ToString();
                    member.PhotoPath = "Unknown.jpg";
                    member.Profession = "étudiant";
                    member.SkypeId = "test";
                    member.Street = "no street";
                    member.ZipCode = "1000";
                    TimeSpan span = new TimeSpan(DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second, DateTime.Now.Millisecond);
                    long c = span.Ticks;
                    member.CreatedOn = BitConverter.GetBytes(c);

                    ListMembers.Add(member);
                    //var password = Utils.RandomUtil.GetRandomString();
                    //var resul= await userManager.CreateAsync(member, password);

                    

                }
                _memberService.CreateList(ListMembers);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return "Excel file has been successfully uploaded";
        }

    }    }

