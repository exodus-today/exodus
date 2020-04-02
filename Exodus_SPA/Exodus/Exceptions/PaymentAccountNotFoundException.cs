using Exodus.Enums;
using Exodus.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{

    public class PaymentAccountNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(PaymentAccountNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.PaymentAccountNotFound;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public PaymentAccountNotFoundException() : base("Payment account not found")
        {
        }

        public PaymentAccountNotFoundException(string message)
            : base(message)
        {
        }

        public PaymentAccountNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}