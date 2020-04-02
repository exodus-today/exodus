using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class ApplicationStartupExceptionList : ExodusException
    {
        public override string Header { get; set; } = typeof(ApplicationStartupExceptionList).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.ApplicationStartupExceptionList;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/ServerError"; } }
        public ApplicationStartupExceptionList() : base("Application Start Exception")
        {
        }

        public ApplicationStartupExceptionList(string message)
            : base(message)
        {
        }

        public ApplicationStartupExceptionList(string message, Exception inner)
            : base(message, inner)
        {
        }


    }
}