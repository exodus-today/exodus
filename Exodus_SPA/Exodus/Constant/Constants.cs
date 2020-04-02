using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Enums;

namespace Exodus.Global
{
    public static class Constants
    {
        public static bool IsLocalImages
        {
            get
            {
                return Configuration.ConfigFile.GetSingle("IsLocalImages").Value.ToLower().Trim() == "true";
            }
        }


        public static bool IsLocalhost
        {
            get
            {
                try { return HttpContext.Current.Request.Url.Host.IndexOf("localhost") != -1; }
                catch { return false; }
            }
        }

        public static En_Currency DefaultCurrency
        {
            get
            {
                return (En_Currency)int.Parse(Configuration.ConfigFile.GetSingle("DefaultCurrency").Value);
            }
        }

        public static string ServerPath
        {
            get
            {
                return Configuration.ConfigFile.Folder_Name;
            }
        }
    }
}