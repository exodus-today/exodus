using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class TagLoginAndJoinDTO
    {
        public string Login { get; set; } = null;
        public string Password { get; set; } = null;
        public long UserID { get; set; }
        public long TagID { get; set; }
    }
}