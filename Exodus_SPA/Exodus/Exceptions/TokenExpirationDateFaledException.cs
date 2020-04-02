using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class TokenExpirationDateFaledException : ExodusException
    {
        public override string Header { get; set; } = typeof(TokenExpirationDateFaledException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.TokenExpirationDateFaled;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/UserNotFound"; } }
        public override string Message
        {
            get { return _Message; }
        }
        private string _Message = "Token expires";

        public TokenExpirationDateFaledException() : base("Token expires")
        {

        }

        public TokenExpirationDateFaledException(string message)
            : base(message)
        {
            _Message = message;
        }

        public TokenExpirationDateFaledException(string message, Exception inner)
            : base(message, inner)
        {
            _Message = message;
        }
    }
}