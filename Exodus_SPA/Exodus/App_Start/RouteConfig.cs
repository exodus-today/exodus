using Exodus.Log4Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Exodus
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            Logger.Logger4Net.Debug("Start RegisterRoutes");
            //
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //
            routes.MapRoute(
                name: "Language",
                url: "{lang}/{controller}/{action}",
                defaults: new { lang = "", controller = "Desktop", action = "Index"},
                constraints: new { lang = @"[a-z]{2}|[a-z]{2}-[a-zA-Z]{2}" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "Desktop", action = "Index" }
            );
            // Routes
            routes.MapRoute("Login", "User/Login", new { controller = "User", action = "Login" });
            routes.MapRoute("ServerError", "Errors/ServerError", new { controller = "Errors", action = "ServerError" });
            routes.MapRoute("UnknownError", "Errors/UnknownError", new { controller = "Errors", action = "UnknownError" });
            routes.MapRoute("PageNotFound", "Errors/PageNotFound", new { controller = "Errors", action = "PageNotFound" });
            routes.MapRoute("LocalisationError", "Errors/LocalisationInit", new { controller = "Errors", action = "LocalisationInit" });
            routes.MapRoute("ApplicationStartupError", "Errors/ApplicationStartupExceptionList", new { controller = "Errors", action = "ApplicationStartupExceptionList" });
            // Log
            Logger.Logger4Net.Debug("End RegisterRoutes");
        }
    }
}