using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Enums;
using Exodus.ViewModels;

namespace Exodus.Exceptions
{
    public class ExodusException : Exception, IExodusException
    {
        public ExodusException() : base("Server Error")
        {
        }

        public ExodusException(string message)
            : base(message)
        {
        }

        public ExodusException(string message, Exception inner)
            : base(message, inner)
        {
        }

        public int CodeNumber => (int)ErrorCode;
        public virtual EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.BaseExeption;
        public virtual string ErrorPath { get; set; } = $"/{Global.Global.Language}/ServerError";
        public virtual DateTime DateTime { get; set; } = DateTime.Now;
        public virtual string Header { get; set; } = "ServerError";
    }
}