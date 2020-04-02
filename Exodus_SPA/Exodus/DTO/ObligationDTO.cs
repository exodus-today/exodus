using Exodus.Enums;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class ObligationDTO
    {
        public long IntentionID { get; set; }
        public long ObligationID { get; set; }
        public En_Currency ObligationCurrency { get; set; }
        public decimal AmountPerPayment { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountTotal { get; set; }
        public bool IsActive { get; set; }
        public EN_Period ObligationPeriod { get; set; }
        // ObligationKind
        public long ObligationKindID { get; set; }
        public string ObligationKindNameEng { get; set; }
        public string ObligationKindNameRus { get; set; } /*!*/
        // ObligationType 
        public EN_ObligationType ObligationTypeID { get; set; }
        public string ObligationTypeNameEng { get; set; }
        public string ObligationTypeNameRus { get; set; }
        // Issuer
        public long ObligationIssuerID { get; set; }
        public string ObligationIssuerFirstName { get; set; } /*!*/
        public string ObligationIssuerLastName { get; set; } /*!*/
        public string ObligationIssuerAvatarSmall { get; set; }
        // Holder
        public long ObligationHolderID { get; set; }
        public string ObligationHolderFirstName { get; set; }  /*!*/
        public string ObligationHolderLastName { get; set; } /*!*/
        public DateTime ObligationDate { get; set; }
        public DateTime ObligationExpiration { get; set; }
        public int RemainDays
        {
            get
            {
                if (ObligationExpiration.Ticks < DateTime.Now.Ticks) { return 0; }
                return (int)ObligationExpiration.Subtract(DateTime.Today).TotalDays;
            }
        }
        public int RemainMonths
        {
            get
            {
                if (ObligationExpiration.Ticks < DateTime.Now.Ticks) { return 0; }
                return RemainYears * 12 + (ObligationExpiration.Month - DateTime.Now.Month);
            }
        }
        public int RemainYears
        {
            get
            {
                if (ObligationExpiration.Ticks < DateTime.Now.Ticks) { return 0; }
                return ObligationExpiration.Year - DateTime.Now.Year;
            }
        }
        public string ObligationHolderAvatarSmall { get; set; }
        // ObligationClass
        public EN_ObligationClass ObligationClass { get; set; }
        public string ObligationClassComment { get; set; }
        public string ObligationClassNameEng { get; set; }
        public string ObligationClassNameRus { get; set; }
        // ObligationStatus
        public EN_ObligationStatus ObligationStatus { get; set; }
        public string ObligationStatusComment { get; set; }
        public string ObligationStatusNameEng { get; set; }
        public string ObligationStatusNameRus { get; set; }
        // Tag
        public long TagID { get; set; }
        public string TagNameEng { get; set; } /*!*/
        public string TagNameRus { get; set; } /*!*/
        public string TagDescription { get; set; }
        // Application
        public int ApplicationID { get; set; }
        public string ApplicationNameEng { get; set; }
        public string ApplicationNameRus { get; set; } /*!*/

        public bool IsExpired { get; set; }
    }
}