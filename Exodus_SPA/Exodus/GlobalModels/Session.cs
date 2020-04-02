using Exodus.Models;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.GlobalModels
{
    public class GM_Session
    {
        public static GM_Session EmptySession
        {
            get { return new GM_Session() { Language = String.Empty, User = null }; }
        }

        public GM_Session() { }

        public GM_Session(VM_User user) { User = user; }

        public string Language { get; set; } = "";

        public VM_User User { get; set; } = null;

        #region Getters

        public UserAvatar Avatar { get { return User?.Avatar; } }

        public long UserID { get { return User == null ? 0 : User.UserID; } }

        #endregion

    }
}