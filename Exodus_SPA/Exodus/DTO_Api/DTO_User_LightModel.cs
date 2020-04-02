using Exodus.Enums;
using Exodus.Models;
using Exodus.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_User_LightModel
    {
        [JsonProperty("ID")]
        public long UserID { get; set; } = -1;
        [JsonProperty("FirstName")]
        public string UserFirstName { get; set; } = "";
        [JsonProperty("LastName")]
        public string UserLastName { get; set; } = "";
        [JsonProperty("HelpDetails")]
        public VM_UserHelpDetail HelpDetails { get; set; } = new VM_UserHelpDetail();
        [JsonProperty("Status")]
        public En_CurrentStatus UserStatus { get; set; }
        [JsonIgnore]
        public UserAvatar Avatar { get; set; } = null;
        public string AvatarBig => Avatar?.AvatarBig;
        public string AvatarSmall => Avatar?.AvatarSmall;
        [JsonProperty("FullName")]
        public string UserFullName => $"{UserFirstName} {UserLastName}";
    }
}