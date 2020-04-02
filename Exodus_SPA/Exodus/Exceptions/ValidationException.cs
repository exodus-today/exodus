using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class ValidationException : ExodusException
    {
        public override string Header { get; set; } = typeof(ValidationException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.Validation;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public ValidationException() : base("Some data is incorrect")
        {
        }

        public ValidationException(string message)
            : base(message)
        {
        }

        public ValidationException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}