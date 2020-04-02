using Exodus.Enums;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class IntentionDTO
    {
       
        public EN_IntentionTerm IntentionTerm { get; set; }
        // Issuer
        public long IntentionIssuerID { get; set; }
        public string IntentionIssuerFirstName { get; set; } /*!*/
        public string IntentionIssuerLastName { get; set; } /*!*/
        public string IntentionIssuerAvatarSmall { get; set; } /*!*/
        // Holder
        public long IntentionHolderID  { get; set; }
        public string IntentionHolderFirstName { get; set; }  /*!*/
        public string IntentionHolderLastName  { get; set; } /*!*/
        public string IntentionHolderAvatarSmall { get; set; } /*!*/
        // Intention
        public decimal IntentionAmount { get; set; } /*!*/
        public long IntentionID { get; set; }
        public EN_Period Period { get; set; } /*!*/
        public En_Currency CurrencyID { get; set; } /*!*/
        public int IntentionDurationMonths { get; set; }
        public DateTime IntentionStartDate { get; set; }
        public DateTime IntentionEndDate { get; set; } /*!*/ // Если разовый

        public string strIntentionStartDate { get; set; }
        public string strIntentionEndDate { get; set; } /*!*/ // Если разовый

        public bool IntentionIsActive { get; set; }
        public int IntentionDayOfWeek { get; set; } /*!*/ // Если переодический
        public int IntentionDayOfMonth { get; set; } /*!*/ // Если переодический
        public string IntentionMemo { get; set; } /*!*/ // Если не пустой
        // Application
        public int ApplicationID { get; set; }
        public string ApplicationNameEng { get; set; } 
        public string ApplicationNameRus { get; set; } /*!*/
        // Tag
        public long TagID { get; set; } 
        public string TagNameEng { get; set; } /*!*/
        public string TagNameRus { get; set; } /*!*/
        public string TagDescription { get; set; }
        // ObligationKind
        public long   ObligationKindID { get; set; }
        public string ObligationKindNameEng { get; set; }
        public string ObligationKindNameRus { get; set; } /*!*/
        // ObligationType 
        public EN_ObligationType ObligationTypeID { get; set; }
        public string ObligationTypeNameEng { get; set; }
        public string ObligationTypeNameRus { get; set; }
        //
        public bool IsExpired { get; set; }
    }
}