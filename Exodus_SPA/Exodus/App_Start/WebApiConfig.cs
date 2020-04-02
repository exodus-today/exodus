using Exodus.Log4Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Exodus
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            Logger.Logger4Net.Debug("Start Init WEB API");
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}"
            );

            // Remove XML
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            if (!config.Formatters.XmlFormatter.SupportedMediaTypes.Contains(appXmlType))
            { config.Formatters.XmlFormatter.SupportedMediaTypes.Add(appXmlType); }
            // Add JSON
            var appJsonType = config.Formatters.JsonFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/json");
            if (!config.Formatters.XmlFormatter.SupportedMediaTypes.Contains(appJsonType))
            { config.Formatters.XmlFormatter.SupportedMediaTypes.Add(appJsonType); }
            //
            Logger.Logger4Net.Debug("End Init WEB API");
        }
    }
}