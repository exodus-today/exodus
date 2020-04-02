using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_EventListItem
    {
        public long EventID { get; set; }
        public DTO_User_LightModel UserFrom { get; set; } = null;
        public DTO_User_LightModel UserTo { get; set; } = null;
        public DateTime DateTime { get; set; } = DateTime.MinValue;
        public string Title { get; set; } = "";
        public EN_ImportantLevel ImportantLevel { get; set; } = EN_ImportantLevel.Medium;
        public EN_EventCategory Category { get; set; }
        public EN_EventType EventType { get; set; }
    }
}