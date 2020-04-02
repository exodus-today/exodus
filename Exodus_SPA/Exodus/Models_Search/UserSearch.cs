using Exodus.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Models.Search
{
    public class UserSearch
    {
        public long UserID { get; set; } = -1;

        public string UserFirstName { get; set; } = "";

        public string UserLastName { get; set; } = "";

        public En_UserType UserType { get; set; }

        public En_CurrentStatus UserStatus { get; set; }

        public string UserStatusMessage { get; set; } = "";

        public string UserAbout { get; set; } = "";

        [JsonIgnore]
        public UserAvatar Avatar { get; set; }
        // Dinamic Fields
        public string AvatarBig => Avatar.AvatarBig;
        public string AvatarSmall => Avatar.AvatarSmall;
        public string UserFullName => $"{UserFirstName} {UserLastName}";
    }
}