using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Helpers
{
    public static class CookieSettings
    {
        public static int LiveInDays { get; set; } = 7;

        public static DateTime LiveTime => DateTime.Now.AddDays(CookieSettings.LiveInDays);

        public static DateTime LiveTimeDefault =>CookieSettings.LiveTime; 
    }

    public static class CookieHelper
    {
        public static bool Exist(string Name)
        {
            if (HttpContext.Current == null || HttpContext.Current.Handler == null) { return false; }
            HttpCookie cookieReq = HttpContext.Current.Request.Cookies[Name];
            if (cookieReq == null) { return false; }
            else if (cookieReq.Expires <= DateTime.Now) { return false; }
            else { return true; }
        }

        public static CookieStatus SetCookies(string name, string value)
        {
            return SetCookies(name, value, CookieSettings.LiveTimeDefault);
        }

        public static CookieStatus SetCookies(string name, string value, DateTime date)
        {
            if (HttpContext.Current?.Handler == null) { return CookieStatus.NotSet; }
            // Check input values
            ValueValidation(name, value, date);
            // Prepare Cookie value
            HttpCookie cookie = new HttpCookie(name, value) { Expires = date };
            //
            HttpCookie cookieReq = HttpContext.Current.Request.Cookies[name];
            // Update or Set
            if (cookieReq == null)
            { HttpContext.Current.Response.Cookies.Add(cookie); return CookieStatus.Set; }
            else
            { HttpContext.Current.Response.SetCookie(cookie); return CookieStatus.Update; }
        }

        public static string GetCookie(string name)
        {
            if (HttpContext.Current == null || HttpContext.Current.Handler == null) { return ""; }
            HttpCookie cookie = HttpContext.Current.Request.Cookies[name];
            return (cookie == null || cookie.Expires >= DateTime.Now) ? "" : cookie.Value;
        }

        public static long? GetCookieAsInt64(string name)
        {
            if (HttpContext.Current == null || HttpContext.Current.Handler == null) { return new long?(); }
            HttpCookie cookie = HttpContext.Current.Request.Cookies[name];
            return (cookie == null || cookie.Expires >= DateTime.Now) ? new long?() : Convert.ToInt64(cookie.Value);
        }

        public static int? GetCookieAsInt32(string name)
        {
            if (HttpContext.Current == null || HttpContext.Current.Handler == null) { return new int?(); }
            HttpCookie cookie = HttpContext.Current.Request.Cookies[name];
            return (cookie == null || cookie.Expires >= DateTime.Now) ? new int?() : Convert.ToInt32(cookie.Value);
        }

        public static void RemoveCookies(params string[] Names)
        {
            foreach (var name in Names)
            { RemoveCookie(name); }
        }

        public static CookieStatus RemoveCookie(string Name)
        {
            if (HttpContext.Current?.Handler == null) { return CookieStatus.NotFound; }
            if (HttpContext.Current.Request.Cookies[Name] != null)
            {
                HttpContext.Current.Response.Cookies[Name].Expires = DateTime.Now.AddDays(-1);
                return CookieStatus.Removed;
            }
            else
            { return CookieStatus.NotFound; }
        }

        public static void RemoveAllCookie()
        {
            if (HttpContext.Current?.Request?.Cookies != null)
            {
                foreach (string key in HttpContext.Current.Response.Cookies.AllKeys)
                {
                    HttpContext.Current.Response.Cookies[key].Expires = DateTime.Now.AddDays(-1);
                }
            }
        }

        private static void ValueValidation(string name, string value, DateTime date)
        {
            if (String.IsNullOrEmpty(name)) { throw new ArgumentNullException("Name"); }
            else if (String.IsNullOrEmpty(value)) { throw new ArgumentNullException("Value"); }
            else if (date.Ticks < DateTime.Now.Ticks) { throw new Exception("Incorrect Date"); }
        }
    }
}