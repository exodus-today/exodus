using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Models
{
    public class TokenAction
    {
        public const string ChangePass = "ChangePassword";

        public long ID { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public string Token { get; set; }

        public string ActionName { get; set; }

        public long UserID { get; set; }
    }
}