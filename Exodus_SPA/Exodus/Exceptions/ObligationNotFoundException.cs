using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class ObligationNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(ObligationNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.ObligationNotFound;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }

        public override string Message
        {
            get { return _Message; }
        }
        private string _Message = "Obligation not found";

        public ObligationNotFoundException(params long[] ObligationID)
        {
            _Message = $"Obligation with ID {string.Join(";", ObligationID)} not found";
        }


        public ObligationNotFoundException() : base("Obligation not found")
        {
           
        }

        public ObligationNotFoundException(string message)
            : base(message)
        {
            _Message = message;
        }

        public ObligationNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
            _Message = message;
        }
    }
}