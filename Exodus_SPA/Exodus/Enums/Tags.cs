using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Enums
{
    public enum EN_TagType
    {
        None = 0,
        RootUser = 1,
        InvitedUsers = 2,
        BookmarkedUsers = 3,
        Relatives = 4,
        Friends = 5,
        Colleagues = 6,
        UserDefined = 1000000
    }

    public enum EN_TagAccessType
    {
        None = 0,
        Public = 1,
        Private = 2,
        System = 3
    }

    public enum EN_TagRole
    {
        None = 0,
        Owner = 1,
        Administrator = 2,
        Member = 3
    }

    public enum EN_TagPeriod
    {
        Undefine = 1,
        Once = 2,
        Weekly = 3,
        Monthly = 4,
        Quarterly = 5,
        Yearly = 6
    }

}