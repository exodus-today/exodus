using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class RegistrationException : ExodusException
    {
        public override string Header { get; set; } = typeof(RegistrationException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.Registration;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public RegistrationException() : base("Registration error")
        {
        }

        public RegistrationException(string message)
            : base(message)
        {
        }

        public RegistrationException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}