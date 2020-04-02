using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Enums
{
    public enum EN_ObligationKind
    {
        H2OUserHelp = 1,
        OwnInitiativeDefaults = 2
    }

    public enum EN_ObligationType
    {
        Money = 1,
        Service = 2,
        Material = 3,
        Thing = 4
    }

    public enum EN_ObligationClass
    {
        Regular = 1,
        NotClaimable = 2
    }

    public enum EN_ObligationStatus
    {
        Cancelled = 1,
        Pending = 2, //Default   
        Confirmed = 3,
        ForExecution = 4,
        Executed = 5,
        Suspended = 6,
        ExecutedPartially = 7
    }
}