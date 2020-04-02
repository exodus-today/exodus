using Exodus.Enums;
using Exodus.Models.Search;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class Tag
        { 
            public static class Get
            {
                public static List<VM_TagPublicWinUserCount> TagPublicWinUserCount()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Tags_Public_with_UserCount().Select(a => new VM_TagPublicWinUserCount()
                        {
                            Application = Global.Cache.dicApplications[(EN_ApplicationType)a.fk_ApplicationID],
                            UserCount = a.UserCount.Value,
                            Tag = new VM_Tag()
                            {
                                TagID = a.TagID,
                                NameRus = a.TagNameRus,
                                NameEng = a.TagNameEng
                           }
                        }).ToList();
                    }
                }

                public static List<long> All_ID()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Tag_GelAllId().Select(a => a.Value).ToList();
                    }
                }

                public static List<VM_Tag> ByUserID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Tags_ByUserID(UserID)
                            .Where(a => Global.Cache.ApplicationsActiveId.Contains(a.ApplicationID)).
                            Select(a => new VM_Tag()
                            {
                                TagID = a.TagID,
                                NameSystem = a.TagNameSystem,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus,
                                Description = a.TagDescription,
                                Created = a.TagCreated,
                                Owner_UserID = a.TagOwner_UserID,
                                OwnerFirstName = a.TagOwnerFirstName,
                                OwnerLastName = a.TagOwnerLastName,
                                Type = (EN_TagType)a.TagTypeID,
                                TypeNameEng = a.TagTypeNameEng,
                                TypeNameRus = a.TagTypeNameRus,
                                TypeCommentEng = a.TagTypeCommentEng,
                                TypeCommentRus = a.TagTypeCommentRus,
                                IsTypePredefined = a.IsTagTypePredefined,
                                AccessType = (EN_TagAccessType)a.TagAccessTypeID,
                                AccessTypeNameEng = a.TagAccessTypeNameEng,
                                AccessTypeNameRus = a.TagAccessTypeNameRus,
                                UsersCount = a.TagUsersCount.Value,
                                Added = a.Added,
                                Role = new VM_TagRole()
                                {
                                    TagRoleID = a.TagRoleID,
                                    NameEng = a.TagRoleNameEng,
                                    NameRus = a.TagRoleNameRus
                                },
                                Period = (EN_TagPeriod)a.PeriodID,
                                PeriodNameEng = a.PeriodNameEng,
                                PeriodNameRus = a.PeriodNameRus,
                                ApplicationID = a.ApplicationID,
                                ApplicationNameEng = a.ApplicationNameEng,
                                ApplicationNameRus = a.ApplicationNameRus,
                                EndDate = a.EndDate.HasValue ? a.EndDate.Value : new DateTime(),
                                DayOfMonth = a.DayOfMonth.HasValue ? a.DayOfMonth.Value : -1,
                                DayOfWeek = a.DayOfWeek.HasValue ? a.DayOfWeek.Value : -1,
                                TotalAmount = a.TotalAmount,
                                TotalAmountCurrencyCode = a.TotalAmountCurrencyCode,
                                TotalAmountCurrencyID = a.TotalAmountCurrencyID,
                                MinIntentionAmount = a.MinIntentionAmount,
                                MinIntentionCurrencyID = a.MinIntentionCurrencyID,
                                MinIntentionCurrencyCode = a.MinIntentionCurrencyCode,
                                DefaultIntentionOwner = new VM_User()
                                {
                                    UserID = a.DefaultIntentionOwnerID,
                                    UserFirstName = a.DefaultIntentionOwnerFirstName,
                                    UserLastName = a.DefaultIntentionOwnerLastName
                                }
                            }).ToList();
                    }
                }

                public static List<VM_Tag> OwnedByUserID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Tags_OwnedByUserID(UserID)
                            .Select(a => new VM_Tag()
                        {
                            TagID = a.TagID,
                            NameSystem = a.TagNameSystem,
                            NameEng = a.TagNameEng,
                            NameRus = a.TagNameRus,
                            Description = a.TagDescription,
                            Created = a.TagCreated,             
                        }).ToList();
                    }
                }

                public static List<VM_TagUser> UsersByTag(long TagID)
                {
                    List<VM_TagUser> userBytag = new List<VM_TagUser>();

                    using (var exodusDB = new exodusEntities())
                    {
                        userBytag = exodusDB.stp_Users_ByTag(TagID).ToList().Select(a => new VM_TagUser()
                        {
                            UserAddedToTag = a.Added,
                            TagUser = new VM_User()
                            {
                                UserID = a.UserID,
                                UserGuid = a.UserGuid,
                                UserFirstName = a.UserFirstName,
                                UserLastName = a.UserLastName,
                                UserType = (En_UserType)a.UserTypeID,
                                UserStatus = (En_CurrentStatus)a.UserStatusID,
                                UserStatusMessage = a.UserStatusMessage,
                                UserAbout = a.UserAbout,
                                UserExternalID = a.ExternalUserID,
                                Avatar = new Models.UserAvatar(a.AvatarBIG, a.AvatarSMALL)
                            },
                            TagRole = new VM_TagRole()
                            {
                                TagRoleID = a.TagRoleID,
                                NameEng = a.TagRoleNameEng,
                                NameRus = a.TagRoleNameRus
                            },
                            Tag = new VM_Tag()
                            {
                                TagID = a.TagID,
                                NameSystem = a.TagNameSystem,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus,
                                Description = a.TagDescription,
                                Created = a.TagCreated,
                                Owner_UserID = a.fk_TagOwnerID,
                                Type =(EN_TagType) a.fk_TagTypeID,
                                AccessType = (EN_TagAccessType)a.fk_TagAccessTypeID,
                                EndDate = a.EndDate.HasValue ? a.EndDate.Value : new DateTime(),
                                DayOfMonth = a.DayOfMonth.HasValue ? a.DayOfMonth.Value : -1,
                                DayOfWeek = a.DayOfWeek.HasValue ? a.DayOfWeek.Value : -1,
                                TotalAmount = a.TotalAmount
                            }
                        }).ToList();
                    }
                    return userBytag;
                }

                public static List<VM_TagUser> UserByTag_WithStatus(long TagID)
                {
                    List<VM_TagUser> tagUsers = new List<VM_TagUser>();

                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_Users_With_Statuses_ByTag(tagID: TagID).ToList();
                        if (rezult.Count > 0)
                        {
                            tagUsers = rezult.Select(a => new VM_TagUser()
                            {
                                UserAddedToTag = a.Added,
                                TagUser = new VM_User()
                                {
                                    UserID = a.UserID,
                                    UserGuid = a.UserGuid,
                                    UserFirstName = a.UserFirstName,
                                    UserLastName = a.UserLastName,
                                    UserType = (En_UserType)a.UserTypeID,
                                    UserStatus = (En_CurrentStatus)a.UserStatusID,
                                    UserStatusMessage = a.UserStatusMessage,
                                    UserAbout = a.UserAbout,
                                    Avatar = new Models.UserAvatar(a.AvatarBIG, a.AvatarSMALL)
                                },
                                StatusInfo = new VM_StatusInfo()
                                {
                                    HelpDetailID = (a.HelpDetailID.HasValue) ? a.HelpDetailID.Value : 0,
                                    UserID = a.UserID,
                                    Status = (En_CurrentStatus)a.UserStatusID,
                                    User_StatusName = a.UserStatusName,
                                    User_StatusComment = a.UserStatusComment,
                                    User_StatusMessage = a.UserStatusMessage,
                                    Currency = (a.CurrencyID.HasValue) ? (En_Currency)a.CurrencyID.Value : En_Currency.NONE,
                                    HelpPeriod = (a.UserHelpPeriodID.HasValue) ? (En_HelpPeriods)a.UserHelpPeriodID.Value : En_HelpPeriods.Undefined,
                                    HelpDetails = a.UserHelpDetails,
                                    AmountRequired = (a.UserHelpAmountRequired.HasValue) ? a.UserHelpAmountRequired.Value : 0,
                                    UpdateDateTime = (a.UpdatedDateTime.HasValue) ? a.UpdatedDateTime.Value : new DateTime(0)
                                },
                                Tag = new VM_Tag()
                                {
                                    TagID = a.fk_TagID
                                },
                                TagRole = new VM_TagRole()
                                {
                                    TagRoleID = a.fk_TagRoleID
                                }
                            }).ToList();
                        }
                    }
                    return tagUsers;
                }

                public static List<VM_Tag> Public_ByUserID(long UserID)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_TagsPublic_ByUserID(UserID).Select(a => new VM_Tag()
                        {
                            TagID = a.TagID,
                            NameSystem = a.TagNameSystem,
                            NameEng = a.TagNameEng,
                            NameRus = a.TagNameRus,
                            Description = a.TagDescription,
                            Created = a.TagCreated,
                            Owner_UserID = a.TagOwner_UserID,
                            OwnerFirstName = a.TagOwnerFirstName,
                            OwnerLastName = a.TagOwnerLastName,
                            Type = (EN_TagType)a.TagTypeID,
                            TypeNameEng = a.TagTypeNameEng,
                            TypeNameRus = a.TagTypeNameRus,
                            TypeCommentEng = a.TagTypeCommentEng,
                            TypeCommentRus = a.TagTypeCommentRus,
                            IsTypePredefined = a.IsTagTypePredefined,
                            AccessType = (EN_TagAccessType)a.TagAccessTypeID,
                            AccessTypeNameEng = a.TagAccessTypeNameEng,
                            AccessTypeNameRus = a.TagAccessTypeNameRus,
                            UsersCount = a.TagUsersCount.Value,
                            Period = (EN_TagPeriod)a.PeriodID,
                            PeriodNameEng = a.PeriodNameEng,
                            PeriodNameRus = a.PeriodNameRus,
                            ApplicationID = a.ApplicationID,
                            ApplicationNameEng = a.ApplicationNameEng,
                            ApplicationNameRus = a.ApplicationNameRus,
                            EndDate = a.EndDate.HasValue ? a.EndDate.Value : new DateTime(),
                            DayOfMonth = a.DayOfMonth.HasValue ? a.DayOfMonth.Value : -1,
                            DayOfWeek = a.DayOfWeek.HasValue ? a.DayOfWeek.Value : -1,
                            TotalAmount = a.TotalAmount,
                            TotalAmountCurrencyCode = a.TotalAmountCurrencyCode,
                            TotalAmountCurrencyID = a.TotalAmountCurrencyID,
                            MinIntentionAmount = a.MinIntentionAmount,
                            MinIntentionCurrencyID = a.MinIntentionCurrencyID,
                            MinIntentionCurrencyCode = a.MinIntentionCurrencyCode,
                            DefaultIntentionOwner = new VM_User()
                            {
                                UserID = a.DefaultIntentionOwnerID,
                                UserFirstName = a.DefaultIntentionOwnerFirstName,
                                UserLastName = a.DefaultIntentionOwnerLastName
                            }

                        }).ToList();
                    }
                }

                public static List<VM_Tag> TagsCommon(long UserID, long CommonUserID)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_TagsCommon(UserID, CommonUserID).Select(a => new VM_Tag()
                        {
                            TagID = a.TagID,
                            NameSystem = a.TagNameSystem,
                            NameEng = a.TagNameEng,
                            NameRus = a.TagNameRus,
                            Description = a.TagDescription,
                            Created = a.TagCreated,
                            Owner_UserID = a.TagOwner_UserID,
                            OwnerFirstName = a.TagOwnerFirstName,
                            OwnerLastName = a.TagOwnerLastName,
                            Type = (EN_TagType)a.TagTypeID,
                            TypeNameEng = a.TagTypeNameEng,
                            TypeNameRus = a.TagTypeNameRus,
                            TypeCommentEng = a.TagTypeCommentEng,
                            TypeCommentRus = a.TagTypeCommentRus,
                            IsTypePredefined = a.IsTagTypePredefined,
                            AccessType = (EN_TagAccessType)a.TagAccessTypeID,
                            AccessTypeNameEng = a.TagAccessTypeNameEng,
                            AccessTypeNameRus = a.TagAccessTypeNameRus,
                            UsersCount = a.TagUsersCount.Value,
                            Period = (EN_TagPeriod)a.PeriodID,
                            PeriodNameEng = a.PeriodNameEng,
                            PeriodNameRus = a.PeriodNameRus,
                            ApplicationID = a.ApplicationID,
                            ApplicationNameEng = a.ApplicationNameEng,
                            ApplicationNameRus = a.ApplicationNameRus,
                            EndDate = a.EndDate.HasValue ? a.EndDate.Value : new DateTime(),
                            DayOfMonth = a.DayOfMonth.HasValue ? a.DayOfMonth.Value : -1,
                            DayOfWeek = a.DayOfWeek.HasValue ? a.DayOfWeek.Value : -1,
                            TotalAmount = a.TotalAmount,
                            TotalAmountCurrencyCode = a.TotalAmountCurrencyCode,
                            TotalAmountCurrencyID = a.TotalAmountCurrencyID,
                            MinIntentionAmount = a.MinIntentionAmount,
                            MinIntentionCurrencyID = a.MinIntentionCurrencyID,
                            MinIntentionCurrencyCode = a.MinIntentionCurrencyCode,
                            DefaultIntentionOwner = new VM_User()
                            {
                                UserID = a.DefaultIntentionOwnerID,
                                UserFirstName = a.DefaultIntentionOwnerFirstName,
                                UserLastName = a.DefaultIntentionOwnerLastName
                            }

                        }).ToList();
                    }
                }

                public static VM_Tag ByID(long TagID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var result = exodusDB.stp_Tag_ByID(TagID).FirstOrDefault();
                        //
                        if (result != null)
                        {
                            var tag = new VM_Tag()
                            {
                                TagID = result.TagID,
                                NameSystem = result.TagNameSystem,
                                NameEng = result.TagNameEng,
                                NameRus = result.TagNameRus,
                                Description = result.TagDescription,
                                Owner_UserID = result.TagOwner_UserID,
                                Created = result.TagCreated,
                                OwnerFirstName = result.TagOwnerFirstName,
                                OwnerLastName = result.TagOwnerLastName,
                                Type = (EN_TagType)result.TagTypeID,
                                TypeNameEng = result.TagTypeNameEng,
                                TypeNameRus = result.TagTypeNameRus,
                                TypeCommentEng = result.TagTypeCommentEng,
                                TypeCommentRus = result.TagTypeCommentRus,
                                IsTypePredefined = result.IsTagTypePredefined,
                                AccessType = (EN_TagAccessType)result.TagAccessTypeID,
                                AccessTypeNameEng = result.TagAccessTypeNameEng,
                                AccessTypeNameRus = result.TagAccessTypeNameRus,
                                UsersCount = result.TagUsersCount.Value,
                                Period = (EN_TagPeriod)result.PeriodID,
                                PeriodNameEng = result.PeriodNameEng,
                                PeriodNameRus = result.PeriodNameRus,
                                ApplicationID = result.ApplicationID,
                                ApplicationNameEng = result.ApplicationNameEng,
                                ApplicationNameRus = result.ApplicationNameRus,
                                EndDate = result.EndDate.HasValue ? result.EndDate.Value : new DateTime(),
                                DayOfMonth = result.DayOfMonth.HasValue ? result.DayOfMonth.Value : -1,
                                DayOfWeek = result.DayOfWeek.HasValue ? result.DayOfWeek.Value : -1,
                                TotalAmount = result.TotalAmount,
                                TotalAmountCurrencyCode = result.TotalAmountCurrencyCode,
                                TotalAmountCurrencyID = result.TotalAmountCurrencyID,
                                MinIntentionAmount = result.MinIntentionAmount,
                                MinIntentionCurrencyID = result.MinIntentionCurrencyID,
                                MinIntentionCurrencyCode = result.MinIntentionCurrencyCode,
                                DefaultIntentionOwner = _DL.User.Get.ByID(result.DefaultIntentionOwnerID) // Get Default Owner
                            };
                            //
                            return tag;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }

                public static EN_TagRole Role(long TagID, long UserID)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        var tagRole = new ObjectParameter("tagRole", 0);
                        //
                        exodusDB.stp_Tag_User_GetRole(TagID, UserID, tagRole);
                        //
                        return (EN_TagRole)Convert.ToInt32(tagRole.Value);
                    }
                }

                public static List<TagSearch> SearchByUserID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Tags_ByUserID(UserID)
                            .Where(a => Global.Cache.ApplicationsActiveId.Contains(a.ApplicationID)).
                            Select(a => new TagSearch()
                            {
                                TagID = a.TagID,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus,
                                Description = a.TagDescription,
                                Owner_UserID = a.TagOwner_UserID,
                                OwnerFirstName = a.TagOwnerFirstName,
                                OwnerLastName = a.TagOwnerLastName,
                                Period = (EN_TagPeriod)a.PeriodID,
                                PeriodNameEng = a.PeriodNameEng,
                                PeriodNameRus = a.PeriodNameRus,
                                ApplicationID = a.ApplicationID,
                                Obligations_Persent = a.obligations_percent.HasValue ? a.obligations_percent.Value : 0,
                                Obligations_Total = a.obligations_total.HasValue ? a.obligations_total.Value : 0,
                                DaysLeft = a.days_left.HasValue ? a.days_left.Value : 0,
                                Intentions_Persent = a.intentions_percent.HasValue ? a.intentions_percent.Value : 0,
                                Intentions_Total = a.intentions_total.HasValue ? a.intentions_total.Value : 0,
                                OwnerStatusID = a.tag_owner_statusID.HasValue ? a.tag_owner_statusID.Value : 0,
                                TagCurrency = (En_Currency)a.TotalAmountCurrencyID
                            }).ToList();
                    }
                }
            }

            public static class Add
            {
                public static long AddTag(VM_Tag Tag)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var tagID = new ObjectParameter("TagID", 0);
                        exodusDB.stp_Tag_Add(tagOwnerID: Tag.Owner_UserID,
                            tagTypeID: (long)Tag.Type,
                            tagAccessTypeID: (int)Tag.AccessType,
                            tagNameEng: Tag.NameEng,
                            tagNameRus: Tag.NameRus,
                            tagDescription: Tag.Description,
                            tagID: tagID,
                            tagApplicationID: Tag.ApplicationID,
                            tagDayOfMonth: Tag.DayOfMonth,
                            tagDayOfWeek: Tag.DayOfWeek,
                            tagEndDate: Tag.EndDate,
                            tagMinIntentionAmount: Tag.MinIntentionAmount,
                            tagPeriod: (int)Tag.Period,
                            tagTotalAmount: Tag.TotalAmount,
                            tagMinIntentionCurrencyID: Tag.MinIntentionCurrencyID,
                            tagTotalAmountCurrencyID: Tag.TotalAmountCurrencyID,
                            defaultIntentionOwnerID: Tag.DefaultIntentionOwner.UserID);

                        long TagID = Convert.ToInt64(tagID.Value);
                        //
                        Global.Cache.AddTagId(TagID);
                        //
                        return TagID;
                    }
                }

                public static long AddUserAsMember(long TagID,long UserID)
                {
                    return AddUser(TagID, (int)EN_TagRole.Member, UserID);
                }

                public static long AddUser(long TagID, int TagRoleID, long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var Ttu_ID = new ObjectParameter("Ttu_ID", 0);

                        exodusDB.stp_Tag_UserAdd(userID: UserID,
                            tagID: TagID,
                            tagRoleID: TagRoleID,
                            ttu_ID: Ttu_ID);
                        return Convert.ToInt64(Ttu_ID.Value);
                    }
                }
            }

            public static class Delete
            {
                public static long UserRemove(long UserID, long TagID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = new ObjectParameter("result", 0);

                        exodusDB.stp_Tag_UserRemove(
                            userID:UserID,
                            tagID: TagID, 
                            result: rez);

                        return Convert.ToInt64(rez.Value);
                    }
                }
            }
        }
    }
}