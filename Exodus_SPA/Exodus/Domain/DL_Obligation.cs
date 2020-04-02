using AutoMapper;
using Exodus.DTO_Api;
using Exodus.Enums;
using Exodus.Extensions;
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

        public class Obligation : Profile
        {
            public Obligation()
            {
                CreateMap<stp_Obligation_ByID_Result, stp_Obligations_All_ByHolderID_Result>();
                CreateMap<stp_Obligation_ByID_Result, stp_Obligations_All_ByIssuerID_Result>();
                CreateMap<stp_Obligation_ByID_Result, stp_Obligation_ByID_Result>();
                CreateMap<stp_Obligation_ByID_Result, stp_Obligation_ByTagID_Result>();
            }
        
            public static class Add
            {
                public static long Obligation(VM_Obligation obligation)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var obligationID = new ObjectParameter("obligationID", 0);

                        exodusDB.stp_ObligationAdd(
                            obligationKindID: (long)obligation.ObligationKind.ObligationKindID,
                            currencyID: (int)obligation.ObligationCurrency,
                            amountPerPayment: obligation.AmountPerPayment,
                            amountDue: obligation.AmountDue,
                            amountTotal: obligation.AmountTotal,
                            isActive: obligation.IsActive,
                            obligationPeriodID: (int)obligation.ObligationPeriod,
                            obligationDate: obligation.ObligationDate,
                            obligationExpiration: obligation.ObligationExpiration,
                            obligationClassID: (long)obligation.ObligationClass.ObligationClass,
                            obligationStatusID: (int)obligation.ObligationStatus.ObligationStatus,
                            obligationTypeID: (int)obligation.ObligationType.ObligationTypeID,
                            tagID: obligation.ObligationTag.TagID,
                            applicationID: (int)obligation.ObligationApplication.ApplicationID,
                            issuerUserID: obligation.ObligationIssuer.UserID,
                            holderUserID: obligation.ObligationHolder.UserID,        
                            obligationID: obligationID,
                            intentionID: obligation.IntentionID
                        );
                        return Convert.ToInt64(obligationID.Value);
                    }
                }

                public static long Routing(DTO_ObligationRouting obligationRouting)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        var routingID = new ObjectParameter("routingID", 0);

                        var rez = exodusDB.stp_Obligation_Routing_Add(
                            obligationID: obligationRouting.ObligationID,
                            routingTypeID: obligationRouting.RoutingTypeID.ToInt(),
                            routedBy_UserID: obligationRouting.RoutedByUserID,
                            routedTo_UserID: obligationRouting.RoutedToUserID,
                            transferTypeID: obligationRouting.TransferTypeID.ToInt(), 
                            accountTypeID: obligationRouting.AccountTypeID.ToInt(),
                            accountID: obligationRouting.AccountID,
                            accountCustomDetails: obligationRouting.AccountCustomDetails,
                            transfer_UserID: obligationRouting.TransferUserID,
                            transferUserCustomDetails: obligationRouting.TransferUserCustomDetails,
                            transferAmount: obligationRouting.TransferAmount,
                            transferAmountCurrency: obligationRouting.TransferAmountCurrency.ToInt(),
                            desiredEndDate: obligationRouting.DesiredEndDate,
                            routingID: routingID);

                        return Convert.ToInt64(routingID.Value);
                    }     
                }
            }

            public static class Delete
            {
                public static int Obligation(long obligationID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Obligation_Delete(obligationID);
                    }
                }
            }

            public static class Update
            {
                public static int Confirm(long obligationID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Obligation_Confirm(obligationID);
                    }
                    
                }
            }

            public static class Get
            {
                public static List<VM_ObligationRouting> Routing_ByObligationID(long ObligationID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Obligation_Routing_ByObligationID(ObligationID);
                        var list = rez.ToList();
                        return list.Select(a => new VM_ObligationRouting()
                        {
                            Account = new VM_Account()
                            {
                                AccountDetails = a.AccountDetails ?? "",
                                AccountID = a.AccountID.HasValue ? a.AccountID.Value : 0,
                                fk_AccountTypeID = a.AccountTypeID.HasValue ? a.AccountTypeID.Value : 0
                            },
                            AccountCustomDetails = a.AccountCustomDetails,
                            AccountType = new VM_AccountType()
                            {
                                AccountTypeID = a.AccountTypeID.HasValue ? a.AccountTypeID.Value : 0,
                                AccountTypeName = a.AccountTypeName ?? ""
                            },
                            DesiredEndDate = a.DesiredEndDate.HasValue ? a.DesiredEndDate.Value : DateTime.MinValue,
                            isExecuted = a.isExecuted,
                            ObligationID = a.ObligationID,
                            RoutedByUser = new VM_User()
                            {
                                UserID = a.RoutedByUserID,
                                UserFirstName = a.RoutedByUserFirstName,
                                UserLastName = a.RoutedByUserLastName,
                                Avatar = Global.Cache.dicUserAvatars[a.RoutedByUserID]
                            },
                            RoutedToUser = new VM_User()
                            {
                                UserID = a.RoutedToUserID,
                                UserFirstName = a.RoutedToUserFirstName,
                                UserLastName = a.RoutedToUserLastName,
                                Avatar = Global.Cache.dicUserAvatars[a.RoutedToUserID]
                            },
                            RoutingDT = a.RoutingDT.HasValue ? a.RoutingDT.Value : DateTime.MinValue,
                            RoutingID = a.RoutingID,
                            RoutingType = new VM_ObligationRoutingType()
                            {
                                RoutingTypeID = a.RoutingTypeID,
                                RoutingTypeNameEng = a.RoutingTypeNameEng,
                                RoutingTypeNameRus = a.RoutingTypeNameRus
                            },
                            TransferAmount = a.TransferAmount,
                            TransferAmountCurrency = (EN_TransferType)a.TransferAmountCurrency,
                            TransferType = new VM_TransferType()
                            {
                                Type = (EN_TransferType)a.TransferTypeID,
                                NameEng = a.TransferTypeNameEng,
                                NameRus = a.TransferTypeNameRus
                            },
                            TransferUser = new VM_User()
                            {
                                UserID = a.TransferUserID.HasValue ? a.TransferUserID.Value : 0,
                                UserFirstName = a.TransferUserFirstName,
                                UserLastName = a.TransferUserLastName,
                                Avatar = a.TransferUserID.HasValue ? Global.Cache.dicUserAvatars[a.TransferUserID.Value] : new Models.UserAvatar()
                            },
                            TransferUserCustomDetails = a.TransferUserCustomDetails ,
                            BankCard = a.AccountTypeID.HasValue ? ((En_AccountType)a.AccountTypeID != En_AccountType.Bank_Card ? new VM_BankCard() : new VM_BankCard()
                            {
                                CardNumber = a.AccountDetails ?? "",
                                BankID = Global.Cache.Get_BankByCardNumber(a.AccountDetails).BankID,
                                BankName = Global.Cache.Get_BankByCardNumber(a.AccountDetails).BankName
                            }) : new VM_BankCard()
                        }).ToList();
                    }
                }

                public static VM_ObligationKind KindDefault_ByAppID(int AppID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Obligation_KindDefault_ByAppID(AppID).First();
                        //
                        return (rez != null) ? new VM_ObligationKind()
                        {
                            Application = new VM_Application() { ApplicationID = rez.fk_ApplicationID },
                            ObligationComment = rez.ObligationComment,
                            ObligationKindID = (EN_ObligationKind)rez.ObligationKindID,
                            ObligationNameEng = rez.ObligationNameEng,
                            ObligationNameRus = rez.ObligationNameRus,
                            IsDefaultAppKind = rez.IsDefaultAppKind.Value
                        } : null;
                    }
                }

                public static VM_Obligation ByID(long ObligationID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Obligation_ByID(ObligationID).FirstOrDefault();
                        return (rez != null) ? GetFromDB(rez) : null;         
                    }
                }

                public static List<VM_Obligation> ByTagID(long TagID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Obligation_ByTagID(TagID);
                        return rez.Select(a => GetFromDB(a)).ToList();
                    }
                }

                public static List<VM_Obligation> ByHolderID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var collection = exodusDB.stp_Obligations_All_ByHolderID(UserID);
                        return collection.Select(a => GetFromDB(a)).ToList();
                    }
                }

                public static List<VM_Obligation> ByIssuerID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Obligations_All_ByIssuerID(UserID);
                        return rez.Select(a => GetFromDB(a)).ToList();
                    }
                }

                public static decimal Obligation_Sum_ByTagID(long TagID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        ObjectParameter Sum = new ObjectParameter("Sum", 0);
                        var rez = exodusDB.stp_Obligation_Sum_ByTagID(TagID, Sum);
                        return Convert.ToDecimal(Sum.Value);
                    }
                }

                private static VM_Obligation GetFromDB<T>(T obligation)
                {
                    stp_Obligation_ByID_Result rez = AutoMapper.Mapper.Map<stp_Obligation_ByID_Result>(obligation);

                    VM_Obligation obligationOut = new VM_Obligation()
                    {
                        IntentionID = rez.IntentionID.HasValue ? rez.IntentionID.Value : 0,
                        AmountDue = rez.AmountDue,
                        AmountPerPayment = rez.AmountPerPayment,
                        AmountTotal = rez.AmountTotal,
                        IsActive = rez.IsActive,
                        ObligationApplication = new VM_Application()
                        {
                            ApplicationID = rez.ApplicationID.HasValue ? rez.ApplicationID.Value : 0,
                            ApplicationDescription = rez.ApplicationDescription,
                            ApplicationIsActive = rez.ApplicationIsActive.HasValue ? rez.ApplicationIsActive.Value : false,
                            ApplicationNameEng = rez.ApplicationNameEng,
                            ApplicationNameRus = rez.ApplicationNameRus

                        },
                        ObligationClass = new VM_ObligationClass()
                        {
                            ObligationClass = (EN_ObligationClass)rez.ObligationClassID,
                            ObligationClassComment = rez.ObligationClassComment,
                            ObligationClassNameEng = rez.ObligationClassNameEng,
                            ObligationClassNameRus = rez.ObligationClassNameRus
                        },
                        ObligationCurrency = (En_Currency)rez.CurrencyID,
                        ObligationDate = rez.ObligationDate,
                        ObligationExpiration = rez.ObligationExpiration.HasValue ? rez.ObligationExpiration.Value : new DateTime(0),
                        ObligationHolder = new VM_User()
                        {
                            UserID = rez.HolderUserID,
                            UserFirstName = rez.HolderUserFirstName,
                            UserLastName = rez.HolderUserLastName,
                            Avatar = Global.Cache.dicUserAvatars[rez.HolderUserID]
                        },
                        ObligationID = rez.ObligationID,
                        ObligationIssuer = new VM_User()
                        {
                            UserID = rez.IssuerUserID,
                            UserFirstName = rez.IssuerUserFirstName,
                            UserLastName = rez.IssuerUserLastName,
                            Avatar = Global.Cache.dicUserAvatars[rez.IssuerUserID]
                        },
                        ObligationKind = new VM_ObligationKind()
                        {
                            ObligationComment = rez.ObligationComment,
                            ObligationKindID = (EN_ObligationKind)rez.ObligationKindID,
                            ObligationNameEng = rez.ObligationNameEng,
                            ObligationNameRus = rez.ObligationNameRus
                        },
                        ObligationPeriod = (EN_Period)rez.PeriodID,
                        ObligationStatus = new VM_ObligationStatus()
                        {
                            ObligationStatus = (EN_ObligationStatus)rez.ObligationStatusID,
                            ObligationStatusComment = rez.ObligationStatusComment,
                            ObligationStatusNameEng = rez.ObligationStatusNameEng,
                            ObligationStatusNameRus = rez.ObligationStatusNameRus
                        },
                        ObligationTag = new VM_Tag()
                        {
                            TagID = rez.TagID.HasValue ? rez.TagID.Value : 0,
                            NameEng = rez.TagNameEng,
                            NameRus = rez.TagNameRus,
                            Description = rez.TagDescription
                        },
                        ObligationType = new VM_ObligationType()
                        {
                            ObligationTypeComment = rez.ObligationTypeComment,
                            ObligationTypeID = (EN_ObligationType)rez.ObligationTypeID,
                            ObligationTypeNameEng = rez.ObligationTypeNameEng,
                            ObligationTypeNameRus = rez.ObligationTypeNameRus
                        }
                    };

                    return obligationOut;
                }
            }
        }

    }
}