using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Enums;
using Exodus.ViewModels;

namespace Exodus.Exceptions
{
    public interface IExodusException
    {
        int CodeNumber { get; }

        EN_ErrorCodes ErrorCode { get; set; }

        // Method Name in Controller
        string Header { get; set; }

        // Path to method
        string ErrorPath { get; set; }

        DateTime DateTime { get; set; }

    }
}