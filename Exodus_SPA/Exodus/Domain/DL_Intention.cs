using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using Exodus.Enums;
using AutoMapper;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public class Intention : Profile
        {
            public Intention()
            {
                CreateMap<stp_Intention_ByID_Result, stp_Intentions_All_ByHolderID_Result>();
                CreateMap<stp_Intention_ByID_Result, stp_Intentions_All_ByIssuerID_Result>();
                CreateMap<stp_Intention_ByID_Result, stp_Intentions_ByUserPublicProfile_Result>();
                CreateMap<stp_Intention_ByID_Result, stp_Intention_ByID_Result>();
                CreateMap<stp_Intention_ByID_Result, stp_Intention_ByTagID_Result>();
                CreateMap<stp_Intention_ByID_Result, stp_Intention_ByUserIssuerID_ByTagID_Result>();
            }

            public static class Add
            {
                public static long Intention(VM_Intention intention)
                {
                    long rezID = 0;
                    using (var exodusDB = new exodusEntities())
                    {
                        ObjectParameter intentionID = new ObjectParameter("intentionID", 0);

                        exodusDB.stp_Intention_Add(
                            obligationTypeID: (int)intention.ObligationType.ObligationTypeID,
                            obligationKindID: (long)intention.ObligationKind.ObligationKindID,
                            periodID: (int)intention.Period,
                            intentionTermID: (int)intention.IntentionTerm,
                            issuerUserID: intention.IntentionIssuer.UserID,
                            holderUserID: intention.IntentionHolder.UserID,
                            tagID: intention.IntentionTag.TagID,
                            applicationID: (int)intention.IntentionApplication.ApplicationID,
                            intentionAmount: intention.IntentionAmount,
                            currencyID: (int)intention.CurrencyID,
                            intentionDurationMonths: intention.IntentionDurationMonths,
                            intentionStartDate: intention.IntentionStartDate,
                            intentionEndDate: intention.IntentionEndDate,
                            intentionIsActive: intention.IntentionIsActive,
                            intentionID: intentionID,
                            dayOfWeek: intention.IntentionDayOfWeek,
                            dayOfMonth: intention.IntentionDayOfMonth,
                            intentionMemo: intention.IntentionMemo
                            );

                        rezID = Convert.ToInt64(intentionID.Value);
                    }

                    return rezID;
                }
            }

            public static class Delete
            {
                public static long ByID(long ID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        long rezID = exodusDB.stp_Intention_Delete_ByID(ID);
                        return rezID;
                    }        
                }
            }

            public static class Update
            {
                public static long Intention(VM_Intention intention)
                {
                    long rezult = 0;
                    using (var exodusDB = new exodusEntities())
                    {
                        var Result = new ObjectParameter("Result", 0);

                        exodusDB.stp_Intention_Update(
                            obligationTypeID: (int)intention.ObligationType.ObligationTypeID,
                            obligationKindID: (long)intention.ObligationKind.ObligationKindID,
                            periodID: (int)intention.Period,
                            intentionTermID: (int)intention.IntentionTerm,
                            issuerUserID: intention.IntentionIssuer.UserID,
                            holderUserID: intention.IntentionHolder.UserID,
                            tagID: intention.IntentionTag.TagID,
                            applicationID: intention.IntentionApplication.ApplicationID,
                            intentionAmount: intention.IntentionAmount,
                            currencyID: (int)intention.CurrencyID,
                            intentionDurationMonths: intention.IntentionDurationMonths,
                            intentionStartDate: intention.IntentionStartDate,
                            intentionEndDate: intention.IntentionEndDate,
                            intentionIsActive: intention.IntentionIsActive,
                            intentionID: intention.IntentionID,
                            result: Result,
                            dayOfWeek: intention.IntentionDayOfWeek,
                            dayOfMonth: intention.IntentionDayOfMonth,
                            intentionMemo: intention.IntentionMemo
                            );

                        rezult = Convert.ToInt64(Result.Value);
                    }

                    return rezult;
                }
            }

            public static class Get
            {
                public static List<VM_Intention> ByTagID(long TagID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Intention_ByTagID(TagID).Select(a => GetIntentionFromDB(a)).ToList();
                    }
                }

                public static List<VM_Intention> ByUserIssuerID_ByTagID(long TagID, long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Intention_ByUserIssuerID_ByTagID(TagID, UserID).Select(a => GetIntentionFromDB(a)).ToList();
                    }
                }

                public static VM_Intention ByID(long IntentionID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_Intention_ByID(IntentionID).FirstOrDefault();
                        if (rezult != null)
                        { return GetIntentionFromDB(rezult); }
                    }
                    return null;
                }

                public static List<VM_Intention> ByIssuerID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_Intentions_All_ByIssuerID(UserID);
                        if (rezult != null)
                        { return rezult.Select(a => GetIntentionFromDB(a)).ToList(); }
                    }
                    return new List<VM_Intention>();
                }

                public static List<VM_Intention> ByHolderID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_Intentions_All_ByHolderID(UserID);
                        if (rezult != null)
                        { return rezult.Select(a => GetIntentionFromDB(a)).ToList(); }
                    }
                    return new List<VM_Intention>();
                }

                public static List<VM_Intention> ByUserPublicProfile(long holderUserID, long? issuerUserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_Intentions_ByUserPublicProfile(
                            holderUserID: holderUserID,
                            issuerUserID: issuerUserID);
                        if (rezult != null)
                        { return rezult.Select(a => GetIntentionFromDB(a)).ToList(); }
                    }
                    return new List<VM_Intention>();
                }

                public static decimal Intention_Sum_ByTagID(long TagID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        ObjectParameter Sum = new ObjectParameter("Sum", 0);
                        var rez = exodusDB.stp_Intention_Sum_ByTagID(TagID, Sum);
                        return Convert.ToDecimal(Sum.Value);
                    }
                }

                private static VM_Intention GetIntentionFromDB<T>(T intention)
                {
                    stp_Intention_ByID_Result rez = AutoMapper.Mapper.Map<stp_Intention_ByID_Result>(intention);
                   
                    VM_Intention vmIntention = new VM_Intention()
                    {
                        CurrencyID = (En_Currency)rez.CurrencyID,
                        IntentionAmount = rez.IntentionAmount,
                        IntentionApplication = new VM_Application()
                        {
                            ApplicationID = rez.ApplicationID,
                            ApplicationDescription = rez.ApplicationDescription,
                            ApplicationIsActive = rez.ApplicationIsActive,
                            ApplicationNameEng = rez.ApplicationNameEng,
                            ApplicationNameRus = rez.ApplicationNameRus
                        },
                        IntentionDurationMonths = rez.IntentionDurationMonths,
                        IntentionEndDate = rez.IntentionEndDate,
                        IntentionHolder = new VM_User()
                        {
                            UserID = rez.HolderUserID,
                            UserFirstName = rez.HolderUserFirstName,
                            UserLastName = rez.HolderUserLastName
                        },
                        IntentionID = rez.IntentionID,
                        IntentionIsActive = rez.IntentionIsActive,
                        IntentionIssuer = new VM_User()
                        {
                            UserID = rez.IssuerUserID,
                            UserFirstName = rez.IssuerUserFirstName,
                            UserLastName = rez.IssuerUserLastName
                        },
                        IntentionStartDate = rez.IntentionStartDate,
                        IntentionTag = new VM_Tag()
                        {
                            TagID = rez.TagID.HasValue ? rez.TagID.Value : 0,
                            NameEng = rez.TagNameEng,
                            NameRus = rez.TagNameRus,
                            Description = rez.TagDescription
                        },
                        IntentionTerm = (EN_IntentionTerm)rez.IntentionTermID,
                        ObligationKind = new VM_ObligationKind()
                        {
                            ObligationComment = rez.ObligationComment,
                            ObligationKindID = (EN_ObligationKind)rez.ObligationKindID,
                            ObligationNameEng = rez.ObligationNameEng,
                            ObligationNameRus = rez.ObligationNameRus
                        },
                        ObligationType = new VM_ObligationType()
                        {
                            ObligationTypeComment = rez.ObligationTypeComment,
                            ObligationTypeID = (EN_ObligationType)rez.ObligationTypeID,
                            ObligationTypeNameEng = rez.ObligationTypeNameEng,
                            ObligationTypeNameRus = rez.ObligationTypeNameRus
                        },
                        Period = (EN_Period)rez.PeriodID,
                        IntentionDayOfMonth = rez.IntentionDayOfMonth.HasValue ? rez.IntentionDayOfMonth.Value : 0,
                        IntentionDayOfWeek = rez.IntentionDayOfWeek.HasValue ? rez.IntentionDayOfWeek.Value : 0,
                        IntentionMemo = rez.IntentionMemo
                    };

                    return vmIntention;
                }


            }

            public static class To
            {
                public static long Obligation(long IntentionID)
                {
                    var ObligationID = new ObjectParameter("ObligationID", 0);

                    using (var exodusDB = new exodusEntities())
                    {
                        long rezult = exodusDB.stp_Intention_To_Obligation(
                            intentionID: IntentionID, 
                            obligationID: ObligationID);
                        // -1 = OK
                        if (rezult == -1) { return Convert.ToInt64(ObligationID.Value); }
                    }
                    return 0;
                }
            }
        }
    }
}