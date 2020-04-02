using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO.Compression;
using System.Web.Mvc;

namespace Exodus.ControllerAttribute
{
    public class CompressAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var encodingsAccepted = filterContext.HttpContext.Request.Headers["Accept-Encoding"];
            if (string.IsNullOrEmpty(encodingsAccepted)) return;
            //
            HttpResponseBase response = filterContext.HttpContext.Response;
            //
            if (encodingsAccepted.Contains("deflate"))
            {
                response.Headers.Remove("Content-Encoding");
                response.AppendHeader("Content-Encoding", "deflate");
                response.Filter = new DeflateStream(response.Filter, CompressionLevel.Optimal);
            }
            else if (encodingsAccepted.Contains("gzip"))
            {
                response.Headers.Remove("Content-Encoding");
                response.AppendHeader("Content-Encoding", "gzip");
                response.Filter = new GZipStream(response.Filter, CompressionLevel.Optimal);   
            }
            //
            response.AppendHeader("Vary", "Content-Encoding");
        }
    }
}