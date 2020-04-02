using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class ApiEventTempleteIncorrectKeys : ExodusException
    {
        public override string Header { get; set; } = typeof(ApplicationNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.api_EventTemplate_IncorrectKey;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/ServerError"; } }
        public ApiEventTempleteIncorrectKeys() : base("Incorrect keys in input dictionary")
        {
        }

        public ApiEventTempleteIncorrectKeys(string message)
            : base(message)
        {
        }

        public ApiEventTempleteIncorrectKeys(string message, Exception inner)
            : base(message, inner)
        {
        }


    }
}