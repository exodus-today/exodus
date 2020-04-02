using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class UserNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(UserAlreadyExistException).Name.Replace("UserNotFoundException", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.UserNotFound;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/UserNotFound"; } }
        public override string Message
        {
            get { return _Message; }
        }
        private string _Message = "User not found";

        public UserNotFoundException() : base("User not found")
        {
            
        }

        public UserNotFoundException(params long[] UserID)
        {
            _Message = $"User with ID {String.Join(";", UserID)} not found";
        }

        public UserNotFoundException(string message)
            : base(message)
        {
            _Message = message;
        }

        public UserNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
            _Message = message;
        }
    }
}