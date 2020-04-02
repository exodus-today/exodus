using Exodus.Enums;
using Exodus.Models;
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
        public static class PaymentAccount
        {
            public static class Get
            {
                public static VM_PaymentAccount ByID(int ID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var acc = exodusDB.stp_GetPaymentAccountByID(ID).FirstOrDefault();
                        if (acc != null)
                        {
                            return new VM_PaymentAccount()
                            {
                                AccountID = ID,
                                AccountDetails = acc.AccountDetails,
                                AccountType = (En_AccountType)acc.fk_AccountTypeID,
                                AccountTypeName = ((En_AccountType)acc.fk_AccountTypeID).ToString(),
                                User = _DL.User.Get.ByID(acc.fk_UserID),
                                Card = new VM_BankCard()
                                {
                                    CardID = acc.CreditCardID.HasValue ? acc.CreditCardID.Value : -1,
                                    AdditionalInfo = acc.CardAdditionalInfo,
                                    BankID = acc.fk_BankID.HasValue ? acc.fk_BankID.Value : -1,
                                    BankName = acc.BankName,
                                    CardNumber = acc.CardNumber,
                                    CardValidTill = acc.CardValidTill.HasValue ? acc.CardValidTill.Value : new DateTime(0),
                                    TypeID = acc.fk_CardTypeID.HasValue ? (EN_CardType)acc.fk_CardTypeID.Value : EN_CardType.None,
                                    UserID = acc.fk_UserID
                                }
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
                   
                public static List<VM_AccountType> Types()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_AccountTypes()
                            .Select(a => new VM_AccountType()
                        {
                            AccountTypeID = a.AccountTypeID,
                            AccountTypeName = a.AccountTypeName
                        }).ToList();
                    }
                }

                public static List<VM_PaymentAccount> ByUserID(long UserID, bool FillUser = true)
                {
                    using (var exodusDB = new exodusEntities())
                    {                       
                        return exodusDB.stp_PaymentAccounts_ByUserID(UserID)
                            .Select(a => new VM_PaymentAccount()
                        {
                            AccountID = a.AccountID,
                            AccountDetails = a.AccountDetails,
                            AccountType = (En_AccountType)a.AccountTypeID,
                            AccountTypeName = a.AccountTypeName,
                            User = FillUser ? new VM_User()
                            {
                                UserFirstName = a.UserFirstName,
                                UserLastName = a.UserLastName,
                                UserID = a.UserID,
                                UserAbout = a.UserAbout,
                                UserGuid = a.UserGuid,
                                UserStatus = (En_CurrentStatus)a.UserStatusID,
                                UserRegistered = a.UserRegistered,
                                UserRegistrationSource = (EN_RegistrationSource)a.UserRegistrationSource,
                                UserStatusMessage = a.UserStatusMessage,
                                UserType = (En_UserType)a.UserTypeID,
                            } : null,
                            Card = new VM_BankCard()
                            {
                                CardID = a.CreditCardID.HasValue ? a.CreditCardID.Value : -1,
                                UserID = a.UserID,
                                TypeID = a.CreditCardTypeID == null ? EN_CardType.Visa : (EN_CardType)a.CreditCardTypeID,
                                BankID = a.BankID.HasValue ? a.BankID.Value : -1,
                                BankName = a.BankName,
                                CardNumber = a.CardNumber,
                                CardValidTill = a.CardValidTill.HasValue ? a.CardValidTill.Value : DateTime.Now,
                                AdditionalInfo = a.CardAdditionalInfo
                            }
                        }).ToList();
                    }
                }

                public static VM_UserPaymentAccounts UserPaymentAccounts(long UserID)
                {
                    var paymentAccounts =  new VM_UserPaymentAccounts()
                    {
                        PaymentAccounts = ByUserID(UserID, false),
                        User = User.Get.ByID(UserID)
                    };
                    return paymentAccounts;
                }
            }

            public static class Update
            {
                public static int UpdateAccount(VM_PaymentAccount account)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = new ObjectParameter("Result", 0);

                        exodusDB.stp_User_Account_Update(
                                accountID: account.AccountID,
                                accountValue: account.AccountDetails,
                                result: rez
                            );

                        return Convert.ToInt32(rez.Value);
                    }
                }
            }

            public static class Delete
            {
                public static int DeleteAccount(long accountID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = new ObjectParameter("Result", 0);

                        exodusDB.stp_User_Account_Delete(
                                accountID: accountID,
                                result: rez
                            );

                        return Convert.ToInt32(rez.Value);
                    }
                }
            }

            public static class Add
            {
                public static long New(VM_PaymentAccount account)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var accountID = new ObjectParameter("AccountID", 0);

                        exodusDB.stp_User_Account_Add(
                                userID: account.User.UserID,
                                accountTypeID: (int)account.AccountType,
                                accountValue: account.AccountDetails,
                                accountID: accountID
                            );

                        return Convert.ToInt64(accountID.Value);
                    }
                }
            }
        }

    }
}