using Exodus.Enums;
using Exodus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Global
{
    public static partial class Cache
    {
        public class UserCache
        {
            public long ID { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Language { get; set; }
            public En_CurrentStatus Status { get; set; }
            public UserAvatar Avatar { get; set; }
        }
    }
}