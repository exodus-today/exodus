using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class InviteCodeException : ExodusException
    {
        public override string Header { get; set; } = typeof(InviteCodeException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.InviteCode;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/IncorrectInviteCode"; } }
        public InviteCodeException() : base("Incorrect invite code")
        {
        }

        public InviteCodeException(string message)
            : base(message)
        {
        }

        public InviteCodeException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}