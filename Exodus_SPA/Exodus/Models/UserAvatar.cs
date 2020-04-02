using Exodus.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Models
{
    public class UserAvatar
    {
        private static readonly UserAvatar _DefaultAvatar = new UserAvatar();
        [JsonIgnore]
        public static UserAvatar DefaultAvatar
        {
            get { return _DefaultAvatar; }
        }

        public UserAvatar() { }
        public UserAvatar(string AvatarBigName, string AvatarSmallName)
        {
            this.AvatarSmallName = AvatarSmallName;
            this.AvatarBigName = AvatarBigName;
        }

        public bool IsDefault 
        { 
            get 
            {
                return (AvatarBigName == AvatarGenerator.DefaultAvatarBigName || AvatarSmallName == AvatarGenerator.DefaultAvatarSmallName);
            } 
        }

        [JsonIgnore]
        public string AvatarBigName { get; set; } = AvatarGenerator.DefaultAvatarBigName;

        public string AvatarBig
        {
            get { return AvatarGenerator.GetUrlPath(AvatarBigName, AvatarType.Big); }
        }
        [JsonIgnore]
        public string AvatarBigFull
        {
            get { return AvatarGenerator.GetFullPath(AvatarBigName, AvatarType.Big); }
        }

        [JsonIgnore]
        public string AvatarSmallName { get; set; } = AvatarGenerator.DefaultAvatarSmallName;
        public string AvatarSmall
        {
            get { return AvatarGenerator.GetUrlPath(AvatarSmallName, AvatarType.Small); }
        }
        [JsonIgnore]
        public string AvatarSmallFull
        {
            get { return AvatarGenerator.GetFullPath(AvatarSmallName, AvatarType.Small); }
        }

    }

    public class UpdateUserAvatar
    {
        public UpdateUserAvatar(long userId, UserAvatar oldAvatar, UserAvatar newAvatart)
        {
            this.UserId = userId;
            this.OldAvatar = oldAvatar;
            this.NewAvatar = newAvatart;
        }

        public long UserId { get; set; }
        public UserAvatar OldAvatar { get; set; }
        public UserAvatar NewAvatar { get; set; }
    }
}