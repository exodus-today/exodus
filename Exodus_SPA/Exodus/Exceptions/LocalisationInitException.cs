using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class LocalisationInitException : ExodusException
    {
        public override string Header { get; set; } = typeof(ApplicationNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.LocalisationInit;
        public override string ErrorPath { get { return $"/Errors/ApplicationNotFound"; } }
        public LocalisationInitException() : base("Application not found")
        {
        }

        public LocalisationInitException(string message)
            : base(message)
        {
        }

        public LocalisationInitException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}