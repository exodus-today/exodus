using Exodus.Enums;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace Exodus.JSON
{
    public static class JsonGenarator
    {
        public static JsonResult GetJson<T>(T Data, EN_ErrorCodes ErrorCode = EN_ErrorCodes.NoException)
        {
            // Get status
            var RequestStatus = (ErrorCode == EN_ErrorCodes.NoException) ? HttpStatusCode.OK : HttpStatusCode.InternalServerError;
            // Generate output
            var output = new  { ErrorCode, RequestStatus, Data };
            // Get Result
            return GetResult(output);
        }

        private static JsonResult GetResult<T>(T data)
        {
            return new JsonResult()
            {
                ContentEncoding = Encoding.UTF8,
                Data = data,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                ContentType = "application/json",
                RecursionLimit = 10,
                MaxJsonLength = Int32.MaxValue
            };
        }
    }
}