using Exodus.Domain;
using Exodus.Enums;
using Exodus.Extensions;
using Exodus.GlobalModels;
using Exodus.Models;
using Exodus.Service;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Xml;

namespace Exodus.Global
{
    public static partial class Cache
    {
        #region Properties

        public static HashSet<long> hsLogInUser { get; set; } = new HashSet<long>();
        public static Dictionary<string, Exception> dicExceptionList { get; set; } = new Dictionary<string, Exception>();
        public static List<VM_Application> ApplicationsActive { get { return dicApplications.Values.Where(a => a.ApplicationIsActive).ToList(); } }

        public static List<int> ApplicationsActiveId { get { return dicApplications.Values.Where(a => a.ApplicationIsActive).Select(a => a.ApplicationID).ToList(); } }

        // Event Templates
        public static Dictionary<EN_EventType, VM_EventType> dicEventTypes { get; set; } = new Dictionary<EN_EventType, VM_EventType>();
        // Applications
        public static Dictionary<EN_ApplicationType, VM_Application> dicApplications { get; set; } = new Dictionary<EN_ApplicationType, VM_Application>();      
        // Banks
        public static Dictionary<long, VM_Bank> dicBanks { get; set; } = new Dictionary<long, VM_Bank>();
        // Users
        public static Dictionary<string, GM_Session> dicUserSession { get; set; } = new Dictionary<string, GM_Session>();
        // Event Templates 
        public static Dictionary<EN_EventType, XmlDocument> dicEventTemplates { get; set; } = new Dictionary<EN_EventType, XmlDocument>();
      
        // IDS Chache List
        public static HashSet<long> hsTagIdList { get; set; } = new HashSet<long>();
        //
        public static HashSet<string> hsUserEmails { get; set; } = new HashSet<string>();

        public static HashSet<long> hsUserIdList { get; set; } = new HashSet<long>();
        // UserID Language
        public static Dictionary<long, string> dicUserIDLanguage { get; set; } = new Dictionary<long, string>();
        // UserID SessionID
        public static Dictionary<long, string> dicUserIDSessionID { get; set; } = new Dictionary<long, string>();

        // User Avatars
        public static Dictionary<long, UserAvatar> dicUserAvatars { get; set; } = new Dictionary<long, UserAvatar>();
        //
        public static Dictionary<long, UserCache> dicUserCache { get; set; } = new Dictionary<long, UserCache>();

        #endregion

        public static VM_Bank Get_BankByCardNumber(string num)
        {
            if (String.IsNullOrEmpty(num)) { return VM_Bank.EmptyBank; }
            num = new string(num.Replace(" ", "").Take(6).ToArray());
            if (String.IsNullOrEmpty(num) || num.Length < 6) { return null; }
            //
            var bank = _DL.Banks.Get.BankNamesByCardNumber(num).FirstOrDefault();
            return bank ?? VM_Bank.EmptyBank;
        }

        #region ListID

        public static void SetUserLanguage(long UserID, string Language)
        {
            if (dicUserIDLanguage.ContainsKey(UserID))
            { dicUserIDLanguage[UserID] = Language; }
            else
            { dicUserIDLanguage.Add(UserID, Language); }
        }

        public static string GetUserLanguage(long UserID)
        {
            return (dicUserIDLanguage.ContainsKey(UserID)) ? dicUserIDLanguage[UserID] : "";
        }

        public static void AddUserId(long id)
        {
            if(!hsUserIdList.Contains(id)) { hsUserIdList.Add(id);}
        }

        public static void RemoveUserId(long id)
        {
            hsUserIdList.Remove(id);
        }

        public static bool CheckUserExists(params long[] IdList)
        {
            foreach (var id in IdList)
            {
                if (!hsUserIdList.Contains(id)) { return false;}
            }
            return true;
        }

        public static void AddTagId(long id)
        {
            if (!hsTagIdList.Contains(id))  { hsTagIdList.Add(id); }
        }

        public static void AddUserEmail(string email)
        {
            if (!hsUserEmails.Contains(email)) { hsUserEmails.Add(email); }
        }

        public static void RemoveTagId(long id)
        {
            hsTagIdList.Remove(id);
        }

        public static bool CheckEmailExists(params string[] emails)
        {
            foreach (var email in emails)
            {
                if (hsUserEmails.Contains(email)) { return true; }
            }
            return false;
        }

        public static bool CheckTagExists(params long[] IdList)
        {

            foreach (var id in IdList)
            {
                if (!hsTagIdList.Contains(id)) { return false; }
            }
            return true;
        }

        public static bool CheckTagExistsAndGet(long ID, out VM_Tag tag)
        {
            tag = null;
            if (!hsTagIdList.Contains(ID)) { return false; }
            // get tag
            tag = _DL.Tag.Get.ByID(ID);
            //
            return true;
        }

        #endregion

        #region Session

        public static bool IsUserLogIn(long UserID)
        {
            return hsLogInUser.Contains(UserID);
        }

        public static void SetLogIn(long UserID)
        {
            if (!hsLogInUser.Contains(UserID)) { hsLogInUser.Add(UserID); };
        }

        public static void SetLogOff(long UserID)
        {
            if (hsLogInUser.Contains(UserID)) { hsLogInUser.Remove(UserID); };
        }

        public static bool SessionContains(string sessionID)
        {
             return dicUserSession.ContainsKey(sessionID ?? "");
        }

        public static void SessionRemove(string sessionID)
        {
            if (dicUserSession.ContainsKey(sessionID))
            {
                dicUserIDSessionID.Remove(dicUserSession[sessionID].UserID);
                //
                dicUserSession.Remove(sessionID);
            }
        }

        public static string GetSessionByUserID(long UserID)
        {
            return (dicUserIDSessionID.ContainsKey(UserID)) ? dicUserIDSessionID[UserID] : null;
        }

        public static void SessionSetUser(string sessionID, VM_User user)
        {
            if (String.IsNullOrEmpty(sessionID) || user == null) { return; }
            //
            if (dicUserSession.ContainsKey(sessionID)) // Update
            {
                dicUserSession[sessionID].User = user;
            }
            else if(user != null)
            {
                dicUserSession.Add(sessionID, new GM_Session(user));
                if (!dicUserIDSessionID.ContainsKey(user.UserID))
                { dicUserIDSessionID.Add(user.UserID, sessionID); }
            }
        }

        public static void SessionSetLanguage(string sessionID, string lang)
        {
            if (String.IsNullOrEmpty(sessionID)) { return; }
            if (dicUserSession.ContainsKey(sessionID))
            {
                dicUserSession[sessionID].Language = lang ?? "ru";
            }
        }

        public static GM_Session SessionGet(string sessionID)
        {
            return (dicUserSession.ContainsKey(sessionID ?? "")) ? dicUserSession[sessionID] : GM_Session.EmptySession;
        }

        #endregion

        public static void AddAvatar(long userID, UserAvatar avatar)
        {
            if (dicUserAvatars.ContainsKey(userID)) 
            {
                dicUserAvatars[userID] = avatar;
            }
            else
            {
                dicUserAvatars.Add(userID, avatar);
            }
        }

        public static UserAvatar GetAvatar(long userID)
        {
            return (dicUserAvatars.ContainsKey(userID)) ? dicUserAvatars[userID] : UserAvatar.DefaultAvatar;
        }

        #region Update

        public static UserAvatar UpdateUserAvatar(long userID, UserAvatar avatar, bool updateCurrent = false)
        {
            AddAvatar(userID, avatar);
            //
            if (updateCurrent && Global.CurrentUser != null)
            {
                Global.CurrentUser.Avatar = avatar;
            }
            //
            return avatar;
        }

        #endregion

    }
}