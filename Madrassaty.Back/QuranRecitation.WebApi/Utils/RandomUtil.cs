using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Utils
{
    public class RandomUtil
    {
            /// <summary>
            /// Get random string of 11 characters.
            /// </summary>
            /// <returns>Random string.</returns>
            public static string GetRandomString()
            {
                string path = Path.GetRandomFileName();
                path = path.Replace(".", ""); // Remove period.
                return path;
            }
        
    }
}