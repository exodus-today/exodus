using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class IncorrectPaymentAccountTypeException : ExodusException
    {
        public override string Header { get; set; } = typeof(IncorrectPaymentAccountTypeException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.IncorrectPaymentAccountType;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public IncorrectPaymentAccountTypeException() : base("Incorrect payment account type")
        {
        }

        public IncorrectPaymentAccountTypeException(string message)
            : base(message)
        {
        }

        public IncorrectPaymentAccountTypeException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}