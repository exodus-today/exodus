using Exodus.API.Helpers;
using Exodus.Domain;
using Exodus.Enums;
using Exodus.Extensions;
using Exodus.GlobalModels;
using Exodus.Helpers;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;

namespace Exodus.Global
{
    public static class Global
    {
        static Global()
        {
            ServerPath = HostingEnvironment.MapPath("~");
        }

        public static string Host { get; set; }

        public static string ServerPath { get; set; }

        public static string MainUrl { get; private set; } = ConfigurationManager.AppSettings["MainUrl"];

        public static string MobileUrl { get; private set; } = ConfigurationManager.AppSettings["MobileUrl"];

        public static bool IsMobileActive { get; private set; } = ConfigurationManager.AppSettings["IsMobileActive"].ToLower().Trim() == "true";

        public static bool IsApplicationFirstStart { get; set; } = true;

        public static string IPAddress
        {
            get
            {
                HttpContext context = HttpContext.Current;
                if (context == null || context.Handler == null) { return ""; }
                string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ??
                       context.Request.ServerVariables["REMOTE_ADDR"].Split(',')[0].Trim();
                return ipAddress;
            }
        }

        public static string Language
        {
            get
            {
                var session = Cache.SessionGet(HttpContext.Current.Session?.SessionID);
                // if null of empty from cookies
                if (String.IsNullOrEmpty(session.Language))
                { session.Language = CookieHelper.GetCookie("Localization"); }
                // try check last user languaage
                if (String.IsNullOrEmpty(session.Language))
                { session.Language = Cache.GetUserLanguage(CurrentUser.UserID); }
                // if still null of empty from location
                if (String.IsNullOrEmpty(session.Language))
                { session.Language = Localisation.GetLanguageByIP(Global.IPAddress); }
                // Set to session
                CookieHelper.SetCookies("Localization", session.Language, DateTime.MaxValue);
                // Set User Language
                Cache.SetUserLanguage(session.UserID, session.Language);
                //
                return session.Language;
            }
            set
            {
                Cache.SessionSetLanguage(HttpContext.Current.Session?.SessionID, value);
                // update cockies
                CookieHelper.SetCookies("Localization", value, DateTime.MaxValue);
            }
        }

        public static VM_User CurrentUser
        {
            get
            {
                // From Session 
                GM_Session session = Cache.SessionGet(HttpContext.Current?.Session?.SessionID);
                // If No one
                if (session.User == null)
                {
                    // From Cookie
                    var value = CookieHelper.GetCookieAsInt64("UserID");
                    if (value.HasValue && HttpContext.Current?.Handler != null)
                    {
                        session.User = _DL.User.Get.ByID(value.Value);
                        Cache.SetLogIn(session.UserID); // Set LogIn Status
                        Cache.SessionSetUser(HttpContext.Current.Session?.SessionID, session.User); 
                    }
                    else
                    { return VM_User.EmptyUser; }
                }
                // Set Cookies
                CookieHelper.SetCookies("UserID", session.User.UserID.ToString(), DateTime.MaxValue);
                CookieHelper.SetCookies("UserName", session.User.UserFullName, DateTime.MaxValue);
                CookieHelper.SetCookies("UserStatus", session.User.UserStatus.ToString(), DateTime.MaxValue);
                //
                return session.User;

            }
            set
            {
                if (value == null || value.UserID < 0 || value.UserGuid == null) { return; }
                // Set user
                if (HttpContext.Current?.Handler != null)
                { Cache.SessionSetUser(HttpContext.Current.Session.SessionID, value); }
                // Set/Update Cookie
                CookieHelper.SetCookies("UserID", value.UserID.ToString(), DateTime.MaxValue);
                CookieHelper.SetCookies("UserName", value.UserFullName, DateTime.MaxValue);
                CookieHelper.SetCookies("UserStatus", value.UserStatus.ToString(), DateTime.MaxValue);
            }
        }

    }
}