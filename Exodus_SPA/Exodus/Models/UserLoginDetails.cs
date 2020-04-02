using Exodus.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Models
{
    public class UserLoginDetails
    {
        public long UserID { get; set; } = -1;
        public string UserLogin { get; set; } = "";

        public Salted_Hash PasswordHash;
    }
}