using AutoMapper;
using Exodus.API.Helpers;
using Exodus.Configuration;
using Exodus.Domain;
using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.GlobalModels;
using Exodus.Helpers;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Exodus.Controllers
{
    public class BaseController : Controller
    {
        protected override void HandleUnknownAction(string actionName)
        {
            string controllerName = this.ControllerContext.RouteData.Values["controller"].ToString();
            ExodusException ex = new ExodusException($"Action [{actionName}] Not Found in controller [{controllerName}]");
            Log4Net.Logger.Write_Error(ex);
            //
            Guid guid = Guid.NewGuid();
            Global.Cache.ExceptionSet(guid.ToString(), ex);
            this.Request.RequestContext.HttpContext.Response.RedirectToRoute("ServerError", new { id = guid.ToString() });
            //
            base.Initialize(this.Request.RequestContext);
        }

        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            // get path
            
            string AbsolutePath = requestContext?.HttpContext?.Request?.Url?.AbsolutePath ?? "";
            // Set language
            string lang = "";
            if (!requestContext.RouteData.Values.ContainsKey("lang"))
            { lang = ""; }
            else
            { lang = SetLang(requestContext?.RouteData?.Values["lang"] as string) ?? ""; }
            // Check Action
            if (!IsUserLogIn && (AbsolutePath == "/" || !Global.Check_Attributes.IsAnonymousAction(AbsolutePath)))
            { requestContext.HttpContext.Response.RedirectToRoute("Login"); }
            // Init Action
            base.Initialize(requestContext);
        }

        private string SetLang(string lang)
        {
            // Test language
            if (String.IsNullOrEmpty(lang))
            { return Language; }
            // if no sutch lang
            if (!Global.Localisation.AvalibleLanguages.Contains(lang.ToLower()))
            { Language = lang = Global.Localisation.DefaultLanguage; }
            // Set selected language
            if (Global.Localisation.IsCultureAvalible(lang))
            { return Language = lang; }
            // Not found
            throw new LanguageNotFoundException();
        }

        protected ActionResult RedirectTo(string actionName, string controllerName, object routeValues = null)
        {
            return (routeValues == null) ? RedirectToAction(actionName, controllerName) : RedirectToAction(actionName, controllerName, routeValues);
        }

        protected ActionResult RedirectTo(string actionName, object routeValues = null)
        {
            return (routeValues == null) ? RedirectToAction(actionName) : RedirectToAction(actionName,  routeValues);
        }

        public string Language
        {
            get { return Global.Global.Language;}
            set { Global.Global.Language = value; }
        }

        public VM_User CurrentUser
        {
            get { return Global.Global.CurrentUser; }
            set { Global.Global.CurrentUser = value; }
        }

        public bool IsUserLogIn
        {
            get { return Global.Cache.IsUserLogIn(CurrentUser.UserID); }
        }

        public void ClearSession()
        {
            GM_Session session = Global.Cache.SessionGet(Session.SessionID);
            Global.Cache.SetUserLanguage(session.UserID, session.Language); // set last language
            Global.Cache.SetLogOff(session.UserID);
            //
            CookieHelper.RemoveCookies("UserID", "UserName", "UserStatus", "api_key");
            FormsAuthentication.SignOut();       
            Session.RemoveAll();
            Session.Abandon();
        }

        public void CurrentUserUpdate()
        {
            CurrentUser = _DL.User.Get.ByID(CurrentUser.UserID);
        }

        public JsonResult GetJson<T>(T Data, EN_ErrorCodes ErrorCode = EN_ErrorCodes.NoException)
        {
            return JSON.JsonGenarator.GetJson(Data, ErrorCode);
        }

        public JsonResult GetJson(EN_ErrorCodes errorCode)
        {
            return JSON.JsonGenarator.GetJson("", errorCode);
        }
    }
}