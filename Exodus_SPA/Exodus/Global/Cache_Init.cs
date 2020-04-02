using Exodus.Domain;
using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Global
{
    public static partial class Cache
    {
        public static void Init()
        {
            // EventTypes
            Init_EventTypes();
            // Application
            Init_Applications();
            // Avatars
            Init_UserAvatars();
            // Banks
            Init_Banks();
            // Event templates
            Init_EventTemplates();
            // User ID
            Init_UserIDList();
            // Tag Id
            Init_TagIDList();
            //
            Init_UserEmails();
        }


        #region Init

        private static void Init_UserEmails()
        {
            hsUserEmails = new HashSet<string>(_DL.User.Get.All_Email());
        }

        private static void Init_TagIDList()
        {
            hsTagIdList = new HashSet<long>(_DL.Tag.Get.All_ID());           
        }

        private static void Init_UserIDList()
        {
            hsUserIdList = new HashSet<long>(_DL.User.Get.All_ID());
        }

        private static void Init_EventTemplates()
        {
            foreach (EN_EventType type in Enum.GetValues(typeof(EN_EventType)))
            {
                if (Helpers.EventTemplate.HasTemplate(type))
                {
                    dicEventTemplates.Add(type, Helpers.EventTemplate.GetFullXml(type));
                }
            }
        }

        private static void Init_Banks()
        {
            _DL.Banks.Get.BankNames().ForEach(a => dicBanks.Add(a.BankID, a));
        }

        private static void Init_EventTypes()
        {
            _DL.Events.Get.Event_Types().ForEach(a => dicEventTypes.Add(a.Type, a));
        }

        private static void Init_Applications()
        {
            _DL.Application.Get.All().ForEach(a => dicApplications.Add(a.Type, a));
        }

        private static void Init_UserAvatars()
        {
            dicUserAvatars = _DL.User.Get.Avatars();
        }

        #endregion
    }
}