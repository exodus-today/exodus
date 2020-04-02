using Exodus.DTO;
using Exodus.Enums;
using Exodus.Extensions;
using Exodus.Helpers;
using Exodus.Models;
using Exodus.Security;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static Exodus.Security.Security;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class User
        {
           
            public static class Delete
            {
                public static int ByID(long UserID)
                {
                    int rezult = 0;
                    using (var exodusDB = new exodusEntities())
                    {
                        rezult = exodusDB.stp_User_Delete_ByID(UserID);
                        //
                        Global.Cache.RemoveUserId(UserID);
                    }
                    return rezult;
                }
            }

            public static class Get
            {
                public static List<string> All_Email()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezList = exodusDB.stp_GetUserEmailsAll().Select(a => a).ToList();
                        //
                        return rezList;
                    }
                }

                public static List<long> All_ID()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezList = exodusDB.stp_User_GelAllId().Select(a => a).ToList();
                        //
                        return rezList.Select(a => a.Value).ToList();
                    }
                }

                public static List<VM_User> RelationsByID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_GetUserRelations_ByUserID(UserID).Select(a => new VM_User()
                        {
                            UserID = a.UserID,
                            UserGuid = a.UserGuid,
                            UserFirstName = a.UserFirstName,
                            UserLastName = a.UserLastName,
                            UserType = (En_UserType)a.UserTypeID,
                            UserStatus = (En_CurrentStatus)a.UserStatusID,
                            UserStatusMessage = a.UserStatusMessage,
                            UserAbout = a.UserAbout,
                            UserRegistered = a.UserRegistered,
                            UserRegistrationSource = (EN_RegistrationSource)a.RegistrationSourceID,
                            Avatar = Global.Cache.dicUserAvatars[a.UserID],
                            HelpDetail = new VM_UserHelpDetail
                            {
                                HelpDetailID = a.HelpDetailID.HasValue ? a.HelpDetailID.Value : 0,
                                UpdatedDateTime = a.UpdatedDateTime.HasValue ? a.UpdatedDateTime.Value : DateTime.MinValue,
                                UserHelpAmountCurrency = a.CurrencyID.HasValue ? (En_Currency)a.CurrencyID.Value : En_Currency.NONE,
                                UserHelpAmountRequired = a.UserHelpAmountRequired.HasValue ? a.UserHelpAmountRequired.Value : 0,
                                UserHelpDetails = a.UserHelpDetails,
                                UserHelpPeriod = a.UserHelpPeriodID.HasValue ? (En_HelpPeriods)a.UserHelpPeriodID.Value : En_HelpPeriods.Undefined,
                                UserID = a.UserID
                            },
                            UserInvitedBy = new VM_User()
                            {
                                UserID = a.UserInvitedBy,
                                Avatar = Global.Cache.dicUserAvatars[a.UserInvitedBy]
                            }

                        }).ToList();
                    }
                }

                public static VM_User ByExternalID(string externalID, EN_RegistrationSource registrationSource)
                {
                    VM_User User = new VM_User();

                    using (var exodusDB = new exodusEntities())
                    {
                        var result = exodusDB.stp_User_ByExternalID(externalID,
                            registrationSource.ToInt()).FirstOrDefault();
                        if (result != null)
                        {
                            User.UserID = result.UserID;
                            User.UserGuid = result.UserGuid;
                            User.UserFirstName = result.UserFirstName;
                            User.UserLastName = result.UserLastName;
                            User.UserType = (En_UserType)result.UserTypeID;
                            User.UserStatus = (En_CurrentStatus)result.UserStatusID;
                            User.UserStatusMessage = result.UserStatusMessage;
                            User.UserAbout = result.UserAbout;
                            User.UserRegistered = result.UserRegistered;
                            User.UserRegistrationSource = (EN_RegistrationSource)result.RegistrationSourceID;
                            User.Avatar = Global.Cache.dicUserAvatars[result.UserID];
                        }
                        else { return null; }
                    }
                    return User;
                }

                public static VM_User ByGuid(string UserGuid)
                {
                    VM_User User = new VM_User();

                    using (var exodusDB = new exodusEntities())
                    {
                        var result = exodusDB.stp_User_ByGuid(UserGuid).FirstOrDefault();
                        if (result != null)
                        {
                            User.UserID = result.UserID;
                            User.UserGuid = result.UserGuid;
                            User.UserFirstName = result.UserFirstName;
                            User.UserLastName = result.UserLastName;
                            User.UserType = (En_UserType)result.UserTypeID;
                            User.UserStatus = (En_CurrentStatus)result.UserStatusID;
                            User.UserStatusMessage = result.UserStatusMessage;
                            User.UserAbout = result.UserAbout;
                            User.UserRegistered = result.UserRegistered;
                            User.UserRegistrationSource = (EN_RegistrationSource)result.UserRegistrationSource;
                            User.Avatar = Global.Cache.dicUserAvatars[result.UserID];
                        }
                        else { return null; }
                    }
                    return User;
                }

                public static VM_User ByID(long UserID)
                {
                    VM_User user = null;
                    using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Exodus_Direct"].ConnectionString))
                    {
                        var cmd = new SqlCommand("stp_User_ByID", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("UserID", UserID);
                        conn.Open();

                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataSet ds = new DataSet();
                        da.Fill(ds);

                        DataTable userMain = ds.Tables[0];      // Users
                        DataTable userInvitedBy = ds.Tables[1]; // UserInvitedBy
                        DataTable userLoginDetails = ds.Tables[2];  // UserLoginDetails
                        DataTable userHelpDetails = ds.Tables[3];  // UserHelpDetails

                        if (userMain.Rows.Count > 0) // if user Found
                        {
                            user = new VM_User();
                            user.UserID = Convert.ToInt64(userMain.Rows[0]["UserID"]);
                            user.UserGuid = userMain.Rows[0]["UserGuid"].ToString();
                            user.UserFirstName = userMain.Rows[0]["UserFirstName"].ToString();
                            user.UserLastName = userMain.Rows[0]["UserLastName"].ToString();
                            user.UserType = (En_UserType)Convert.ToInt32(userMain.Rows[0]["UserTypeID"]);
                            user.UserStatus = (En_CurrentStatus)Convert.ToInt32(userMain.Rows[0]["UserStatusID"]);
                            user.UserStatusMessage = userMain.Rows[0]["UserStatusMessage"].ToString();
                            user.UserAbout = userMain.Rows[0]["UserAbout"].ToString();
                            user.UserRegistered = DateTime.Parse(userMain.Rows[0]["UserRegistered"].ToString());
                            user.UserRegistrationSource = (EN_RegistrationSource)int.Parse(userMain.Rows[0]["UserRegistrationSource"].ToString());
                            if (Global.Cache.dicUserAvatars.ContainsKey(Convert.ToInt64(userMain.Rows[0]["UserID"])))
                            { user.Avatar = Global.Cache.dicUserAvatars[Convert.ToInt64(userMain.Rows[0]["UserID"])];
                        }

                            if (userInvitedBy.Rows.Count > 0)
                            {
                                user.UserInvitedBy = new VM_User
                                {
                                    UserID = Convert.ToInt64(userInvitedBy.Rows[0]["UserID"]),
                                    UserGuid = userInvitedBy.Rows[0]["UserGuid"].ToString()
                                };
                                if (Global.Cache.dicUserAvatars.ContainsKey(Convert.ToInt64(userInvitedBy.Rows[0]["UserID"])))
                                {
                                    user.UserInvitedBy.Avatar = Global.Cache.dicUserAvatars[Convert.ToInt64(userInvitedBy.Rows[0]["UserID"])];
                                }
                            }

                            user.UserStatus = (En_CurrentStatus)Convert.ToInt32(userMain.Rows[0]["UserStatusID"]);
                            user.UserInvitedBy.UserFirstName = userInvitedBy.Rows[0]["UserFirstName"].ToString();
                            user.UserInvitedBy.UserLastName = userInvitedBy.Rows[0]["UserLastName"].ToString();
                            user.UserInvitedBy.UserType = (En_UserType)Convert.ToInt32(userInvitedBy.Rows[0]["UserTypeID"]);
                            user.UserInvitedBy.UserAbout = userInvitedBy.Rows[0]["UserAbout"].ToString();
                            

                            if (userLoginDetails.Rows.Count > 0)
                            {
                                user.UserEmail = userLoginDetails.Rows[0]["UserLogin"].ToString();
                            }

                            if (userHelpDetails.Rows.Count > 0)
                            {
                                user.HelpDetail = new VM_UserHelpDetail
                                {
                                    HelpDetailID = Convert.ToInt64(userHelpDetails.Rows[0]["HelpDetailID"]),
                                    UpdatedDateTime = DateTime.Parse(userHelpDetails.Rows[0]["UpdatedDateTime"].ToString()),
                                    UserHelpAmountCurrency = (En_Currency)Convert.ToInt32(userHelpDetails.Rows[0]["fk_UserHelpAmountCurrencyID"]),
                                    UserHelpAmountRequired = Convert.ToDecimal(userHelpDetails.Rows[0]["UserHelpAmountRequired"]),
                                    UserHelpDetails = Convert.ToString(userHelpDetails.Rows[0]["UserHelpDetails"]),
                                    UserHelpPeriod = (En_HelpPeriods)Convert.ToInt32(userHelpDetails.Rows[0]["fk_UserHelpPeriodID"]),
                                    UserID = Convert.ToInt64(userHelpDetails.Rows[0]["fk_UserID"])
                                };
                            }
                        }

                    }
                    return user;
                }

                public static VM_User ByEmail(string UserEmail)
                {
                    VM_User user =null;
                    using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Exodus_Direct"].ConnectionString))
                    {
                        var cmd = new SqlCommand("stp_User_ByEmail", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("UserEmail", UserEmail);
                        conn.Open();

                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataSet ds = new DataSet();
                        da.Fill(ds);

                        DataTable userMain = ds.Tables[0];      // Users
                        DataTable userInvitedBy = ds.Tables[1]; // UserInvitedBy
                        DataTable userLoginDetails = ds.Tables[2];  // UserLoginDetails
                        DataTable userHelpDetails = ds.Tables[3];  // UserHelpDetails

                        if (userMain.Rows.Count > 0)
                        {
                            user = new VM_User();
                            user.UserID = Convert.ToInt64(userMain.Rows[0]["UserID"]);
                            user.UserGuid = userMain.Rows[0]["UserGuid"].ToString();
                            user.UserFirstName = userMain.Rows[0]["UserFirstName"].ToString();
                            user.UserLastName = userMain.Rows[0]["UserLastName"].ToString();
                            user.UserType = (En_UserType)Convert.ToInt32(userMain.Rows[0]["UserTypeID"]);
                            user.UserStatus = (En_CurrentStatus)Convert.ToInt32(userMain.Rows[0]["UserStatusID"]);
                            user.UserStatusMessage = userMain.Rows[0]["UserStatusMessage"].ToString();
                            user.UserAbout = userMain.Rows[0]["UserAbout"].ToString();
                            user.UserRegistered = DateTime.Parse(userMain.Rows[0]["UserRegistered"].ToString());
                            user.UserRegistrationSource = (EN_RegistrationSource)int.Parse(userMain.Rows[0]["UserRegistrationSource"].ToString());
                            user.Avatar = new UserAvatar(userMain.Rows[0]["AvatarBIG"].ToString(), userMain.Rows[0]["AvatarSMALL"].ToString());


                            if (userInvitedBy.Rows.Count > 0)
                            {
                                user.UserInvitedBy = new VM_User
                                {
                                    UserID = Convert.ToInt64(userInvitedBy.Rows[0]["UserID"]),
                                    UserGuid = userInvitedBy.Rows[0]["UserGuid"].ToString()
                                };
                                user.UserStatus = (En_CurrentStatus)Convert.ToInt32(userMain.Rows[0]["UserStatusID"]);
                                user.UserInvitedBy.UserFirstName = userInvitedBy.Rows[0]["UserFirstName"].ToString();
                                user.UserInvitedBy.UserLastName = userInvitedBy.Rows[0]["UserLastName"].ToString();
                                user.UserInvitedBy.UserType = (En_UserType)Convert.ToInt32(userInvitedBy.Rows[0]["UserTypeID"]);
                                user.UserInvitedBy.UserAbout = userInvitedBy.Rows[0]["UserAbout"].ToString();
                            }

                            if (userLoginDetails.Rows.Count > 0)
                            {
                                user.UserEmail = userLoginDetails.Rows[0]["UserLogin"].ToString();
                            }

                            if (userHelpDetails.Rows.Count > 0)
                            {
                                user.HelpDetail = new VM_UserHelpDetail
                                {
                                    HelpDetailID = Convert.ToInt64(userHelpDetails.Rows[0]["HelpDetailID"]),
                                    UpdatedDateTime = DateTime.Parse(userHelpDetails.Rows[0]["UpdatedDateTime"].ToString()),
                                    UserHelpAmountCurrency = (En_Currency)Convert.ToInt32(userHelpDetails.Rows[0]["fk_UserHelpAmountCurrencyID"]),
                                    UserHelpAmountRequired = Convert.ToDecimal(userHelpDetails.Rows[0]["UserHelpAmountRequired"]),
                                    UserHelpDetails = Convert.ToString(userHelpDetails.Rows[0]["UserHelpDetails"]),
                                    UserHelpPeriod = (En_HelpPeriods)Convert.ToInt32(userHelpDetails.Rows[0]["fk_UserHelpPeriodID"]),
                                    UserID = Convert.ToInt64(userHelpDetails.Rows[0]["fk_UserID"])
                                };
                            }
                        }
                    }
                    return user;
                }

                public static VM_User SystemUser()
                {
                    //641C2AD5-9F5B-432A-81A3-8DD5670F1784
                    string sysUser = "641C2AD5-9F5B-432A-81A3-8DD5670F1784";
                    VM_User systemUser = ByGuid(sysUser);
                    return systemUser;
                }

                public static List<VM_User> All()
                {
                    List<VM_User> Users = new List<VM_User>();

                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_User_GetAll().Select(a => new VM_User()
                        {
                            UserID = a.UserID,
                            UserGuid = a.UserGuid,
                            UserFirstName = a.UserFirstName,
                            UserLastName = a.UserLastName,
                            UserType = (En_UserType)a.UserTypeID,
                            UserStatus = (En_CurrentStatus)a.UserStatusID,
                            UserStatusMessage = a.UserStatusMessage,
                            UserAbout = a.UserAbout,
                            UserRegistered = a.UserRegistered,
                            UserRegistrationSource = (EN_RegistrationSource)a.RegistrationSourceID,
                            Avatar = new UserAvatar(a.AvatarBIG, a.AvatarSMALL),
                            HelpDetail = new VM_UserHelpDetail
                            {
                                HelpDetailID = a.HelpDetailID.HasValue ?  a.HelpDetailID.Value : 0,
                                UpdatedDateTime = a.UpdatedDateTime.HasValue ? a.UpdatedDateTime.Value : DateTime.MinValue,
                                UserHelpAmountCurrency = a.CurrencyID.HasValue ? (En_Currency)a.CurrencyID.Value : En_Currency.NONE,
                                UserHelpAmountRequired = a.UserHelpAmountRequired.HasValue ? a.UserHelpAmountRequired.Value : 0,
                                UserHelpDetails = a.UserHelpDetails,
                                UserHelpPeriod = a.UserHelpPeriodID.HasValue ? (En_HelpPeriods)a.UserHelpPeriodID.Value : En_HelpPeriods.Undefined,
                                UserID = a.UserID
                            },
                            UserInvitedBy = new VM_User()
                            {
                                UserID = a.UserInvitedBy
                            }

                    }).ToList();
                     
                    }
                }

                public static Dictionary<long, UserAvatar> Avatars()
                {
                    Dictionary<long, UserAvatar> dic = new Dictionary<long, UserAvatar>();
                    //
                    using (var exodusDB = new exodusEntities())
                    {
                        foreach (var item in exodusDB.stp_User_GetAvatarAll())
                        {
                            dic.Add(item.UserID, new UserAvatar(item.AvatarBig, item.AvatarSmall));
                        }                          
                    }
                    return dic;
                }
            }

            public static class Update
            {
                public static int About(long UserID, string UserAbout)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_User_About_Update(UserID, UserAbout);
                    }
                }

                public static UserAvatar Avatar(long UserID, UserAvatar avatar)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        int rezult = exodusDB.stp_User_Avatar_Update(avatar.AvatarBigName, avatar.AvatarSmallName, UserID);
                        return (rezult != 0) ? avatar : null;
                    }
                }

                public static int Password(long UserID, string password)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var hash = HashHMACSHA1.CreateSaltedHash(password, 10);

                        return exodusDB.stp_User_Password_Update(UserID, hash.Hash, hash.Salt, hash.Iterations);
                    }
                }
            }

            public static class Account
            {
                // TO TEST
                public static class Add
                {
                    public static long Account(VM_Account account)
                    {
                        using (var exodusDB = new exodusEntities())
                        {
                            ObjectParameter accountID = new ObjectParameter("accountID", 0);

                            exodusDB.stp_User_Account_Add(
                                userID: account.fk_UserID,
                                accountTypeID: account.fk_AccountTypeID,
                                accountValue: account.AccountDetails,
                                accountID: accountID);

                            return Convert.ToInt64(accountID.Value);
                        }
                    }
                }

                // IMPLEMENT
                public static class Get
                {
                    public static VM_Account ByID(long accountID)
                    {
                        throw new NotImplementedException();

                        /*
                        VM_Account account = new VM_Account();

                        using (var exodusDB = new exodusEntities())
                        {
                            var result = exodusDB.stp_User_Account_ByID(accountID: accountID)
                                .FirstOrDefault();

                            if (result != null)
                            {
                                account = new VM_Account()
                                {
                                };
                            }
                        }

                        return account;
                        */
                    }
                }

                // TO TEST
                public static class Delete
                {
                    public static int ById(long accountID)
                    {
                        using (var exodusDB = new exodusEntities())
                        {
                            var result = new ObjectParameter("result", 0);

                            exodusDB.stp_User_Account_Delete(accountID: accountID, result: result);

                            return Convert.ToInt32(result.Value);
                        }                        
                    }
                }

                public static class Update
                {
                    public static int UpdateAccount(VM_Account account)
                    {
                        using (var exodusDB = new exodusEntities())
                        {
                            var result = new ObjectParameter("result", 0);

                            exodusDB.stp_User_Account_Update(
                                    accountValue: account.AccountDetails,
                                    accountID: account.AccountID,
                                    result: result
                                    );

                            return Convert.ToInt32(result.Value);
                        }
                    }

                    public static int UserStatusUpdate(En_CurrentStatus UserStatus, VM_UserHelpDetail detail)
                    {
                        using (var exodusDB = new exodusEntities())
                        {
                            var userStatus = new ObjectParameter("result", 0);

                            exodusDB.stp_User_Status_Update(
                                userID: detail.UserID,
                                userStatusID: (int)UserStatus,
                                userHelpPeriodID: (int)detail.UserHelpPeriod,
                                userHelpAmountCurrencyID: (int)detail.UserHelpAmountCurrency,
                                userHelpAmountRequired: detail.UserHelpAmountRequired,
                                userHelpDetails: detail.UserHelpDetails ?? "",
                                result: userStatus);

                            var value = Convert.ToInt32(userStatus.Value);

                            return value;
                        }
                    }
                }

                public static bool CheckExistence_ByEmail(string Email)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var userCount = new ObjectParameter("userCount", 0);

                        exodusDB.stp_User_Check_Existence_ByEmail(userEmail: Email, userCount: userCount);

                        return Convert.ToBoolean(userCount.Value);
                    }
                }

                public static UserLoginDetails LoginDetails_ByEmail(string Email)
                {
                    var UserLoginDetails = new UserLoginDetails();

                    using (var exodusDB = new exodusEntities())
                    {
                        var result = exodusDB.stp_UserLoginDetails_ByEmail(Email).FirstOrDefault();

                        if (result != null)
                        {
                            UserLoginDetails.UserID = result.fk_UserID;
                            UserLoginDetails.UserLogin = result.UserLogin;
                            UserLoginDetails.PasswordHash = new Salted_Hash()
                            {
                                Hash = result.UserPassword,
                                Salt = result.UserPasswordSalt,
                                Iterations = (int)result.HashIterations
                            };
                        }
                    }

                    return UserLoginDetails;
                }

                public static VM_UserRegister Register(VM_UserRegister user)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var newUserID = new ObjectParameter("userID", 0);

                        exodusDB.stp_User_Register(
                                userInvitedBy: user.InvitedBy.UserID,
                                userLogin: user.UserEmail,
                                userPasswordHash: user.UserLoginDetails.Hash,
                                userPasswordSalt: user.UserLoginDetails.Salt,
                                hashIterations: user.UserLoginDetails.Iterations,
                                userFirstName: user.UserFirstName,
                                userLastName: user.UserLastName,
                                userTypeID: user.UserType.ToInt(),
                                userStatusID: user.UserStatus.ToInt(),
                                userStatusMessage: "",
                                userAbout: "",
                                userRegistrationSource: user.RegistrationSource.ToInt(),
                                userFlags: 0,
                                userID: newUserID,
                                externalID: user.ExternalID
                        );
                        //
                        long userID = Convert.ToInt64(newUserID.Value);
                        if (userID > 0)
                        {
                            //
                            Global.Cache.AddUserEmail(user.UserEmail);
                            //
                            Global.Cache.AddUserId(userID);
                            //
                            Global.Cache.UpdateUserAvatar(userID, UserAvatar.DefaultAvatar, true);
                            //
                            user.UserID = userID;
                        }
                    }
                    return user;
                }
            }
        }
    }
}