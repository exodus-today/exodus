using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class HttpForbiddenException : ExodusException
    {
        public override string Header { get; set; } = typeof(HttpForbiddenException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.Forbidden;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public HttpForbiddenException() : base("Forbidden")
        {
        }

        public HttpForbiddenException(string message)
            : base(message)
        {
        }

        public HttpForbiddenException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}