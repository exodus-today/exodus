using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class YouHaveAlreadyInTagException : ExodusException
    {
        public override string Header { get; set; } = typeof(YouHaveAlreadyInTagException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.YouHaveAlreadyInTag;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/TagCanNotAddYourSelf"; } }
        public YouHaveAlreadyInTagException() : base("You Have Already In Tag")
        {
        }

        public YouHaveAlreadyInTagException(string message)
            : base(message)
        {
        }

        public YouHaveAlreadyInTagException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}