using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class IntentionNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(IntentionNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.IntentionNotFound;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }

        public override string Message
        {
            get { return _Message; }
        }
        private string _Message = "Intention not found";

        public IntentionNotFoundException(params long[] IntentionID)
        {
            _Message = $"Intention with ID {string.Join(";", IntentionID)} not found";
        }

        public IntentionNotFoundException() : base("Intention not found")
        {

        }

        public IntentionNotFoundException(string message)
            : base(message)
        {
            _Message = message;
        }

        public IntentionNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
            _Message = message;
        }
    }
}