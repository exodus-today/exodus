using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class ApplicationNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(ApplicationNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.ApplicationNotFound;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/ApplicationNotFound"; } }
        public ApplicationNotFoundException() : base("Application not found")
        {
        }

        public ApplicationNotFoundException(string message)
            : base(message)
        {
        }

        public ApplicationNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }

        
    }
}