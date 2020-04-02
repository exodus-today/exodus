using System.Web.Http;
using WebActivatorEx;
using Exodus;
using Swashbuckle.Application;
using System;
using System.Xml.XPath;
using System.Net.Http;
using System.Linq;
using Exodus.Log4Net;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace Exodus
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            // --------------------
            Logger.Logger4Net.Debug("Start Init SWAGGER");
            GlobalConfiguration.Configuration.EnableSwagger(c =>
            {
                c.SingleApiVersion("v2", "Title API");
                c.SchemaId(x => x.FullName);
            }).EnableSwaggerUi();
            // --------------------
            Logger.Logger4Net.Debug("End Init SWAGGER");
        }
    }
}
