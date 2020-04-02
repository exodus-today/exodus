using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{

    public class LoginException : ExodusException
    {
        public override string Header { get; set; } = typeof(LoginException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.Login;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/IncorrectLogin"; } }
        public LoginException() : base("Some data is incorrect")
        {
        }

        public LoginException(string message)
            : base(message)
        {
        }

        public LoginException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}