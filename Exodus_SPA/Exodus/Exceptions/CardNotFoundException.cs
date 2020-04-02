using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class CardNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(CardNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.CardNotFound;
        public override string ErrorPath { get { return $"/{Global.Global.Language}/Errors/CardNotFound"; } }
        public CardNotFoundException() : base("Card not found")
        {
        }

        public CardNotFoundException(string message)
            : base(message)
        {
        }

        public CardNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}