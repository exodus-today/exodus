using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Exceptions
{
    public class DataBaseException : ExodusException
    {
        public override string Header { get; set; } = typeof(DataBaseException).Name.Replace("Exception", "");
        public override EN_ErrorCodes ErrorCode { get; set; } = EN_ErrorCodes.DataBase;
        public override string ErrorPath { get => base.ErrorPath; set => base.ErrorPath = value; }
        public DataBaseException() : base("Data Bese Exeption")
        {
        }

        public DataBaseException(string message)
            : base(message)
        {
        }

        public DataBaseException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}