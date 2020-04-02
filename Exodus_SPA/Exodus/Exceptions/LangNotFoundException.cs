using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Enums;

namespace Exodus.Exceptions
{
    public class LanguageNotFoundException : ExodusException
    {
        public override string Header { get; set; } = typeof(LanguageNotFoundException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.LanguageNotFound;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public LanguageNotFoundException() : base("Language not found")
        {
        }

        public LanguageNotFoundException(string message)
            : base(message)
        {
        }

        public LanguageNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}