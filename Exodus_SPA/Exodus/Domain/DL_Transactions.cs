using Exodus.Enums;
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
        public static class Transactions
        {
            public static class Get
            {
                public static List<VM_Transaction> ByUserSender(long UserID)
                {
                    List<VM_Transaction> transactions = new List<VM_Transaction>();

                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transactions_ByUserSender(UserID);
                        transactions = rez.Select(a => new VM_Transaction()
                        {
                            TransactionID = a.TransactionID,
                            Application = new VM_Application()
                            {
                                ApplicationID = a.ApplicationID.HasValue ? a.ApplicationID.Value : 0,
                                ApplicationNameEng = a.ApplicationNameEng,
                                ApplicationNameRus = a.ApplicationNameRus
                            },
                            IsConfirmed = a.isConfirmed,
                            IsConfirmedByReceiver = a.isConfirmedByReceiver,
                            IsConfirmedBySender = a.isConfirmedBySender,
                            Obligation = new VM_Obligation()
                            {
                                ObligationID = a.ObligationID.HasValue ? a.ObligationID.Value : 0,
                                ObligationKind = new VM_ObligationKind()
                                {
                                    ObligationKindID = a.ObligationKindID.HasValue ? (EN_ObligationKind)a.ObligationKindID.Value : EN_ObligationKind.H2OUserHelp,
                                    ObligationNameEng = a.ObligationNameEng,
                                    ObligationNameRus = a.ObligationNameRus,
                                    ObligationComment = a.ObligationComment
                                },
                            },
                            Tag = new VM_Tag()
                            {
                                TagID = a.TagID.HasValue ? a.TagID.Value : 0,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus
                            },
                            TransactionAmount = a.TransactionAmount,
                            TransactionDateTime = a.TransactionDateTime,
                            TransactionMemo = a.TransactionMemo,
                            TransactionAccount = new VM_Account()
                            {
                                AccountDetails = a.AccountDetails,
                                AccountID = a.AccountID.HasValue ? a.AccountID.Value : 0,
                                fk_AccountTypeID = a.AccountTypeID.HasValue ? a.AccountTypeID.Value : 0
                                //fk_UserID 
                            },
                            TransactionSender = new VM_User()
                            {
                                UserID = a.SenderUserID,
                                UserFirstName = a.SenderUserFirstName,
                                UserLastName = a.SenderUserLastName
                            },
                            TransactionReceiver = new VM_User()
                            {
                                UserID = a.ReceiverUserID,
                                UserFirstName = a.ReceiverUserFirstName,
                                UserLastName = a.ReceiverUserLastName
                            },
                            TransferType = (EN_TransferType)a.TransferTypeID,
                            TransactionCurrency = (En_Currency)a.CurrencyID
                        }).ToList();
                    }
                    return transactions;
                }

                public static List<VM_Transaction> ByUserReceiver(long UserID)
                {
                    List<VM_Transaction> transactions = new List<VM_Transaction>();

                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transactions_ByUserReceiver(UserID);
                        transactions = rez.Select(a => new VM_Transaction()
                        {
                            TransactionID = a.TransactionID,
                            Application = new VM_Application()
                            {
                                ApplicationID = a.ApplicationID.HasValue ? a.ApplicationID.Value : 0,
                                ApplicationNameEng = a.ApplicationNameEng,
                                ApplicationNameRus = a.ApplicationNameRus
                            },
                            IsConfirmed = a.isConfirmed,
                            IsConfirmedByReceiver = a.isConfirmedByReceiver,
                            IsConfirmedBySender = a.isConfirmedBySender,
                            Obligation = new VM_Obligation()
                            {
                                ObligationID = a.ObligationID.HasValue ? a.ObligationID.Value : 0,
                                ObligationKind = new VM_ObligationKind()
                                {
                                    ObligationKindID = a.ObligationKindID.HasValue ? (EN_ObligationKind)a.ObligationKindID.Value : EN_ObligationKind.H2OUserHelp,
                                    ObligationNameEng = a.ObligationNameEng,
                                    ObligationNameRus = a.ObligationNameRus,
                                    ObligationComment = a.ObligationComment
                                },
                            },
                            Tag = new VM_Tag()
                            {
                                TagID = a.TagID.HasValue ? a.TagID.Value : 0,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus
                            },
                            TransactionAmount = a.TransactionAmount,
                            TransactionDateTime = a.TransactionDateTime,
                            TransactionMemo = a.TransactionMemo,
                            TransactionAccount = new VM_Account()
                            {
                                AccountDetails = a.AccountDetails,
                                AccountID = a.AccountID.HasValue ? a.AccountID.Value : 0,
                                fk_AccountTypeID = a.AccountTypeID.HasValue ? a.AccountTypeID.Value : 0
                                //fk_UserID 
                            },
                            TransactionSender = new VM_User()
                            {
                                UserID = a.SenderUserID,
                                UserFirstName = a.SenderUserFirstName,
                                UserLastName = a.SenderUserLastName
                            },
                            TransactionReceiver = new VM_User()
                            {
                                UserID = a.ReceiverUserID,
                                UserFirstName = a.ReceiverUserFirstName,
                                UserLastName = a.ReceiverUserLastName
                            },
                            TransferType = (EN_TransferType)a.TransferTypeID,
                            TransactionCurrency = (En_Currency)a.CurrencyID
                        }).ToList();
                    }
                    return transactions;
                }

                public static VM_Transaction ByID(long TransactionID)
                {
                    VM_Transaction transaction = null;
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transaction_ByID(TransactionID).FirstOrDefault();
                        if(rez != null)
                        {
                            transaction = new VM_Transaction()
                            {
                                TransactionID = rez.TransactionID,
                                Application = new VM_Application()
                                {
                                    ApplicationID = rez.ApplicationID.HasValue ? rez.ApplicationID.Value : 0,
                                    ApplicationNameEng = rez.ApplicationNameEng,
                                    ApplicationNameRus = rez.ApplicationNameRus
                                },
                                IsConfirmed = rez.isConfirmed,
                                IsConfirmedByReceiver = rez.isConfirmedByReceiver,
                                IsConfirmedBySender = rez.isConfirmedBySender,
                                Obligation = new VM_Obligation()
                                {
                                    ObligationID = rez.ObligationID.HasValue ? rez.ObligationID.Value : 0,
                                    ObligationKind = new VM_ObligationKind()
                                    {
                                        ObligationKindID = rez.ObligationKindID.HasValue ? (EN_ObligationKind)rez.ObligationKindID.Value : EN_ObligationKind.H2OUserHelp,
                                        ObligationNameEng = rez.ObligationNameEng,
                                        ObligationNameRus = rez.ObligationNameRus,
                                        ObligationComment = rez.ObligationComment
                                    },
                                },
                                Tag = new VM_Tag()
                                {
                                    TagID = rez.TagID.HasValue ? rez.TagID.Value : 0,
                                    NameEng = rez.TagNameEng,
                                    NameRus = rez.TagNameRus
                                },
                                TransactionAmount = rez.TransactionAmount,
                                TransactionDateTime = rez.TransactionDateTime,
                                TransactionMemo = rez.TransactionMemo,
                                TransactionAccount = new VM_Account()
                                {
                                    AccountDetails = rez.AccountDetails,
                                    AccountID = rez.AccountID.HasValue ? rez.AccountID.Value : 0,
                                    fk_AccountTypeID = rez.AccountTypeID.HasValue ? rez.AccountTypeID.Value : 0
                                    //fk_UserID 
                                },
                                TransactionSender = new VM_User()
                                {
                                    UserID = rez.SenderUserID,
                                    UserFirstName = rez.SenderUserFirstName,
                                    UserLastName = rez.SenderUserLastName
                                },
                                TransactionReceiver = new VM_User()
                                {
                                    UserID = rez.ReceiverUserID,
                                    UserFirstName = rez.ReceiverUserFirstName,
                                    UserLastName = rez.ReceiverUserLastName
                                },
                                TransferType = (EN_TransferType)rez.TransferTypeID,
                                TransactionCurrency = (En_Currency)rez.CurrencyID
                            };
                        }

                    }
                    return transaction;
                }

                public static List<VM_Transaction> ByTag(long TagID)
                {
                    List<VM_Transaction> transactions = new List<VM_Transaction>();
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transactions_ByTag(TagID);
                        transactions = rez.Select(a => new VM_Transaction()
                        {
                            TransactionID = a.TransactionID,
                            Application = new VM_Application()
                            {
                                ApplicationID = a.ApplicationID.HasValue ? a.ApplicationID.Value : 0,
                                ApplicationNameEng = a.ApplicationNameEng,
                                ApplicationNameRus = a.ApplicationNameRus
                            },
                            IsConfirmed = a.isConfirmed,
                            IsConfirmedByReceiver = a.isConfirmedByReceiver,
                            IsConfirmedBySender = a.isConfirmedBySender,
                            Obligation = new VM_Obligation()
                            {
                                ObligationID = a.ObligationID.HasValue ? a.ObligationID.Value : 0,
                                ObligationKind = new VM_ObligationKind()
                                {
                                    ObligationKindID = a.ObligationKindID.HasValue ? (EN_ObligationKind)a.ObligationKindID.Value : EN_ObligationKind.H2OUserHelp,
                                    ObligationNameEng = a.ObligationNameEng,
                                    ObligationNameRus = a.ObligationNameRus,
                                    ObligationComment = a.ObligationComment
                                },
                            },
                            Tag = new VM_Tag()
                            {
                                TagID = a.TagID.HasValue ? a.TagID.Value : 0,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus
                            },
                            TransactionAmount = a.TransactionAmount,
                            TransactionDateTime = a.TransactionDateTime,
                            TransactionMemo = a.TransactionMemo,
                            TransactionAccount = new VM_Account()
                            {
                                AccountDetails = a.AccountDetails,
                                AccountID = a.AccountID.HasValue ? a.AccountID.Value : 0,
                                fk_AccountTypeID = a.AccountTypeID.HasValue ? a.AccountTypeID.Value : 0
                                //fk_UserID 
                            },
                            TransactionSender = new VM_User()
                            {
                                UserID = a.SenderUserID,
                                UserFirstName = a.SenderUserFirstName,
                                UserLastName = a.SenderUserLastName
                            },
                            TransactionReceiver = new VM_User()
                            {
                                UserID = a.ReceiverUserID,
                                UserFirstName = a.ReceiverUserFirstName,
                                UserLastName = a.ReceiverUserLastName
                            },
                            TransferType = (EN_TransferType)a.TransferTypeID,
                            TransactionCurrency = (En_Currency)a.CurrencyID
                        }).ToList();
                    }
                    return transactions;
                }

                public static List<VM_Transaction> ByTagApplication(long TagID, long ApplicationID)
                {
                    List<VM_Transaction> transactions = new List<VM_Transaction>();
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transactions_ByTagApplication(TagID, (int)ApplicationID);
                        transactions = rez.Select(a => new VM_Transaction()
                        {
                            TransactionID = a.TransactionID,
                            Application = new VM_Application()
                            {
                                ApplicationID = a.ApplicationID.HasValue ? a.ApplicationID.Value : 0,
                                ApplicationNameEng = a.ApplicationNameEng,
                                ApplicationNameRus = a.ApplicationNameRus
                            },
                            IsConfirmed = a.isConfirmed,
                            IsConfirmedByReceiver = a.isConfirmedByReceiver,
                            IsConfirmedBySender = a.isConfirmedBySender,
                            Obligation = new VM_Obligation()
                            {
                                ObligationID = a.ObligationID.HasValue ? a.ObligationID.Value : 0,
                                ObligationKind = new VM_ObligationKind()
                                {
                                    ObligationKindID = a.ObligationKindID.HasValue ? (EN_ObligationKind)a.ObligationKindID.Value : EN_ObligationKind.H2OUserHelp,
                                    ObligationNameEng = a.ObligationNameEng,
                                    ObligationNameRus = a.ObligationNameRus,
                                    ObligationComment = a.ObligationComment
                                },
                            },
                            Tag = new VM_Tag()
                            {
                                TagID = a.TagID.HasValue ? a.TagID.Value : 0,
                                NameEng = a.TagNameEng,
                                NameRus = a.TagNameRus
                            },
                            TransactionAmount = a.TransactionAmount,
                            TransactionDateTime = a.TransactionDateTime,
                            TransactionMemo = a.TransactionMemo,
                            TransactionAccount = new VM_Account()
                            {
                                AccountDetails = a.AccountDetails,
                                AccountID = a.AccountID.HasValue ? a.AccountID.Value : 0,
                                fk_AccountTypeID = a.AccountTypeID.HasValue ? a.AccountTypeID.Value : 0
                                //fk_UserID 
                            },
                            TransactionSender = new VM_User()
                            {
                                UserID = a.SenderUserID,
                                UserFirstName = a.SenderUserFirstName,
                                UserLastName = a.SenderUserLastName
                            },
                            TransactionReceiver = new VM_User()
                            {
                                UserID = a.ReceiverUserID,
                                UserFirstName = a.ReceiverUserFirstName,
                                UserLastName = a.ReceiverUserLastName
                            },
                            TransferType = (EN_TransferType)a.TransferTypeID,
                            TransactionCurrency = (En_Currency)a.CurrencyID
                        }).ToList();
                    }
                    return transactions;
                }

                #region PRIVATE FUNCTION

                /*private static VM_Transaction FillTransactionFromModel<T>(T rezult)
                {
                    VM_Transaction transact = new VM_Transaction()
                    {
                        TransactionID = rezult.TransactionID,
                        IsConfirmed = rezult.isConfirmed,
                        IsConfirmedByReceiver = rezult.isConfirmedByReceiver,
                        IsConfirmedBySender = rezult.isConfirmedBySender,
                        TransactionAmount = rezult.TransactionAmount,
                        TransactionDateTime = rezult.TransactionDateTime,
                        TransactionMemo = rezult.TransactionMemo,
                        TransferType = (EN_TransferType)rezult.TransferTypeID,
                        TransactionCurrency = (En_Currency)rezult.CurrencyID
                    };
                }*/

                #endregion

            }

            public static class Add
            {
                public static long Transaction(VM_Transaction transaction)
                {
                    int intRez = 0;
                    using (var exodusDB = new exodusEntities())
                    {
                        var Result = new ObjectParameter("TransactionID", 0);

                        intRez = exodusDB.stp_Transaction_Add(
                            transactionAmount: transaction.TransactionAmount,
                            transactionCurrencyID: (int)transaction.TransactionCurrency,
                            transactionSender_UserID: transaction.TransactionSender.UserID,
                            transactionReceiver_UserID: transaction.TransactionReceiver.UserID,
                            tagID: transaction.Tag?.TagID,
                            applicationID: transaction.Application?.ApplicationID,
                            obligationID: transaction.Obligation?.ObligationID,
                            isConfirmed: transaction.IsConfirmed,
                            isConfirmedBySender: transaction.IsConfirmedBySender,
                            isConfirmedByReceiver: transaction.IsConfirmedByReceiver,
                            transactionDateTime: transaction.TransactionDateTime,
                            transactionAccountID: transaction.TransactionAccount?.AccountID,
                            transferTypeID: (int)transaction.TransferType,
                            transactionMemo: transaction.TransactionMemo,
                            transactionID: Result);

                        return Convert.ToInt64(Result.Value);
                    }
                }
            }


            public static class Update
            {
                public static int Transaction_Confirm(long TransactionID, bool IsConfirmedBySender, bool IsConfirmedByReceiver)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transaction_Confirm(TransactionID, IsConfirmedBySender, IsConfirmedByReceiver);
                        return rez;
                    }
                }

                public static int Transaction_ConfirmBySender(long TransactionID, bool IsConfirmedBySender)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transaction_Confirm_BySender(TransactionID, IsConfirmedBySender);
                        return rez;
                    }
                }

                public static int Transaction_ConfirmByReceiver(long TransactionID, bool IsConfirmedByReceiver)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Transaction_Confirm_ByReceiver(TransactionID, IsConfirmedByReceiver);
                        return rez;
                    }
                }
            }

            public static class Delete
            {
               
            }
        }

    }
}