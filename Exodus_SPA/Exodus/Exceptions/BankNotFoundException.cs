using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class BankNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(BankNotFoundException).Name.Replace("Exception", "");
        public override  EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.BankNotFound;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/BankNotFound"; } }
        public BankNotFoundException() : base("Bank not found")
        {
        }

        public BankNotFoundException(string message)
            : base(message)
        {
        }

        public BankNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}