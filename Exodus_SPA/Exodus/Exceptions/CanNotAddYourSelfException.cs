using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class CanNotAddYourSelfException : ExodusException
    {
        public override string Header { get; set; } = typeof(CanNotAddYourSelfException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.CanNotAddYourSelf;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/TagCanNotAddYourSelf"; } }
        public CanNotAddYourSelfException() : base("Can not add your self")
        {
        }

        public CanNotAddYourSelfException(string message)
            : base(message)
        {
        }

        public CanNotAddYourSelfException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}