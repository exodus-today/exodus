using log4net;
using log4net.Config;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Exodus.Log4Net
{
    public static class Logger
    {
        private static string FileName { get; set; } = ConfigurationManager.AppSettings["Logger4Net.File"];

        private static string FilePath { get { return System.Web.Hosting.HostingEnvironment.MapPath(FileName); }  }

        public static ILog Logger4Net {  get; private set; } = LogManager.GetLogger("LOGGER");

        static Logger()
        {
            XmlConfigurator.ConfigureAndWatch(new System.IO.FileInfo(FilePath));
        }

        public static string Write_Message(string msg)
        {
            // crete message
            string message = $"";
            // if from user
            if (Global.Global.CurrentUser.UserID != 0)
            {
                message += $"USER: {Global.Global.CurrentUser.UserFullName}[{Global.Global.CurrentUser.UserID}]";
            }
            // Add to log
            Logger4Net.Debug(message);
            //
            return message;
        }

        public static string Write_Error(Exception ex)
        {
            // crete message
            string message = $"";
            // if from user
            if (Global.Global.CurrentUser.UserID != 0)
            {
                message += $"USER: {Global.Global.CurrentUser.UserFullName}[{Global.Global.CurrentUser.UserID}]";
            }
            // Add Message
            message += $"MESSAGE: {ex.Message}";
            // If Inner
            if (ex.InnerException != null)
            {
                message += $"\r\nINNERE MESSAGE: {ex.InnerException.Message}";
            }
            // Add to log
            Logger4Net.Error(message, ex);
            //
            return message;
        }
    }
}