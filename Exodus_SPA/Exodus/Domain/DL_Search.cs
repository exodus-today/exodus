using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Enums;
using Exodus.Helpers;
using Exodus.Models.Search;
using Exodus.ViewModels;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class Search
        {
            public static List<object> Any(string query)
            {
                var lang = Exodus.Global.Global.Language.ToLower();
                using (var exodus = new exodusEntities())
                {
                    var elems = exodus.stp_Search_Tag_ByString(query).Select(a => new
                    {
                        name = (lang == "ru") ? a.TagNameRus : a.TagNameEng,
                        item = new TagSearch()
                        {
                            TagID = a.TagID,
                            NameEng = a.TagNameEng,
                            NameRus = a.TagNameRus,
                            Description = a.TagDescription,
                            Owner_UserID = a.TagOwner_UserID,
                            ApplicationID = a.ApplicationID
                        } as object
                    }).ToList();

                    elems.AddRange(exodus.stp_Search_User_ByString(query).Select(a => new
                    {
                        name = $"{a.UserFirstName} {a.UserLastName}",
                        item = new UserSearch()
                        {
                            UserID = a.UserID,
                            UserFirstName = a.UserFirstName,
                            UserLastName = a.UserLastName,
                            UserType = (En_UserType)a.UserTypeID,
                            UserStatus = (En_CurrentStatus)a.UserStatusID,
                            UserStatusMessage = a.UserStatusMessage,
                            UserAbout = a.UserAbout,
                            Avatar = new Models.UserAvatar(a.AvatarBIG, a.AvatarSMALL)
                        } as object
                    }));
                    return elems.OrderBy(a => a.name).Select(a => a.item).ToList();
                }
            }

            public static List<UserSearch> UserByString(string query)
            {
                using (var exodusDB = new exodusEntities())
                {
                    return exodusDB.stp_Search_User_ByString(query).Select(
                        result => new UserSearch()
                        {
                            UserID = result.UserID,
                            UserFirstName = result.UserFirstName,
                            UserLastName = result.UserLastName,
                            UserType = (En_UserType)result.UserTypeID,
                            UserStatus = (En_CurrentStatus)result.UserStatusID,
                            UserStatusMessage = result.UserStatusMessage,
                            UserAbout = result.UserAbout,
                            Avatar = new Models.UserAvatar(result.AvatarBIG, result.AvatarSMALL)
                        }).ToList();
                }
            }

            public static List<TagSearch> TagByString(string query)
            {
                using (var exodusDB = new exodusEntities())
                {
                    return exodusDB.stp_Search_Tag_ByString(query).Select(
                        a => new TagSearch()
                        {
                            TagID = a.TagID,
                            NameEng = a.TagNameEng,
                            NameRus = a.TagNameRus,
                            Description = a.TagDescription,
                            Owner_UserID = a.TagOwner_UserID,       
                            ApplicationID = a.ApplicationID,
                        }).ToList();
                }
            }
        }
    }
}