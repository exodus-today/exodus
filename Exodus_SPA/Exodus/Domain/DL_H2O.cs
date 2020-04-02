using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using Exodus.Enums;
using Exodus.Extensions;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class H2O
        {
            public static class Get
            {
                public static decimal Obligations_ByUserID_CurrentMonth(long UserID, En_Currency currency = En_Currency.USD)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var obligationAmount = new ObjectParameter("ObligationAmount", 0);
                        int rez = exodusDB.stp_H2O_Obligations_ByUserID_CurrentMonth(UserID, currency.ToInt(), obligationAmount);
                        return Convert.ToDecimal(obligationAmount.Value);
                    }
                }

                public static decimal Intentions_ByUserID_CurrentMonth(long UserID, En_Currency currency = En_Currency.USD)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var intentionAmount = new ObjectParameter("IntentionAmount", 0);
                        int rez = exodusDB.stp_H2O_Intentions_ByUserID_CurrentMonth(UserID, currency.ToInt(), intentionAmount);
                        return Convert.ToDecimal(intentionAmount.Value);
                    }
                }

                public static decimal Intentions_ByUserID_CurrentMonth(long UserID, DateTime dateTime, En_Currency currency = En_Currency.USD)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var intentionAmount = new ObjectParameter("IntentionAmount", 0);
                        int rez = exodusDB.stp_H2O_Intentions_ByUserID_n_Month(UserID, dateTime, currency.ToInt(), intentionAmount);
                        return Convert.ToDecimal(intentionAmount.Value);
                    }
                }
            }
        }
    }
}