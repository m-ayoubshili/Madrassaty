using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Utils
{
    public class FileUtility
    {
        public static void SaveUploadedPhoto(byte[] imageByteArray, string filename, bool isSchool = false)
        {
            string path = isSchool ?
                HttpContext.Current.Server.MapPath("~/images/school/" + filename + ".jpg") :
                HttpContext.Current.Server.MapPath("~/images/members/" + filename + ".jpg");

            if (File.Exists(path))
                File.Delete(path);

            File.WriteAllBytes(path, imageByteArray);
        }
    }
}