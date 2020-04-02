using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{

    public class TransactionNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(TransactionNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.TransactionNotFound;
        public TransactionNotFoundException() : base("Transaction not found")
        {
        }

        public TransactionNotFoundException(string message)
            : base(message)
        {
        }

        public TransactionNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }


    }
}