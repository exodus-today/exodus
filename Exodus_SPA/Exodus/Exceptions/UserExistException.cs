using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class UserAlreadyExistException : ExodusException
    {
        public override string Header { get; set; } = typeof(UserAlreadyExistException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.UserExist;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/UserAlreadyExist"; } }
        public UserAlreadyExistException() : base("User not found")
        {
        }

        public UserAlreadyExistException(string message)
            : base(message)
        {
        }

        public UserAlreadyExistException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}