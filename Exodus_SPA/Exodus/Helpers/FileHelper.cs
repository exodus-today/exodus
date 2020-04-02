using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Exodus.Helpers
{
    public class FileHelper
    {
        public static string ServerPath = HttpContext.Current.Server.MapPath("~");

        public static string AsString(string folder, string file)
        {
            string path = Path.Combine(ServerPath, folder, file);
            return File.ReadAllText(path);
        }

        public static byte[] AsByteArray(string folder, string file)
        {
            string path = Path.Combine(ServerPath, folder, file);
            return File.ReadAllBytes(path);
        }

        public static string[] GetFileList(string folder)
        {
            string path = Path.Combine(ServerPath, folder);
            return Directory.GetFiles(path);
        }

        public static FileStream Stream(string folder, string file)
        {
            string path = Path.Combine(ServerPath, folder, file);
            return File.OpenRead(path);
        }
    }
}