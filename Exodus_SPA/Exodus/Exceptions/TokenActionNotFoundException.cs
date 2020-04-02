using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class TokenActionNotFoundException : ExodusException
    { 
            public override string Header { get; set; } = typeof(TokenActionNotFoundException).Name.Replace("Exception", "");
            public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.TokenActionNotFound;
            public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/UserNotFound"; } }
            public override string Message
            {
                get { return _Message; }
            }
            private string _Message = "Token not found";

            public TokenActionNotFoundException() : base("Token not found")
            {

            }

            public TokenActionNotFoundException(string message)
                : base(message)
            {
                _Message = message;
            }

            public TokenActionNotFoundException(string message, Exception inner)
                : base(message, inner)
            {
                _Message = message;
            }
        }
}