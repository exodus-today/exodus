using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public class Contact
    {
        public long ContactID;
        public En_ContactType ContactType;
        public long UserID;
        public string ContactValue;
    }
}