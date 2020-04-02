using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.ViewModels;
using Newtonsoft.Json;

namespace Exodus.DTO_Api
{
    public class DTO_Obligation
    {
        public long ObligationID { get; set; } = 0;
        public long ObligationKindID { get; set; }
        public En_Currency ObligationCurrency { get; set; }
        public decimal AmountPerPayment { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountTotal { get; set; }
        public bool IsActive { get; set; }
        public EN_Period ObligationPeriod { get; set; }
        public DateTime ObligationDate { get; set; }
        public DateTime ObligationExpiration { get; set; }
        public EN_ObligationClass ObligationClass { get; set; }
        public EN_ObligationStatus ObligationStatus { get; set; }
        public EN_ObligationType ObligationTypeID { get; set; }
        public int ApplicationID { get; set; } = 0;
        public long TagID { get; set; } = 0;
        public long IssueUserID { get; set; } = 0;  // ЭМИТЕНТ (выпустивший облигацию)
        public long HolderUserID { get; set; } = 0; // ДЕРЖАТЕЛЬ

        [JsonIgnore]
        public VM_Obligation ViewModel
        {
            get
            {
                return new VM_Obligation()
                {
                    ObligationID = ObligationID,
                    ObligationKind = new VM_ObligationKind { ObligationKindID = (EN_ObligationKind)ObligationKindID },
                    ObligationCurrency = ObligationCurrency,
                    AmountPerPayment = AmountPerPayment,
                    AmountDue = AmountDue,
                    AmountTotal = AmountTotal,
                    IsActive = IsActive,
                    ObligationPeriod = ObligationPeriod,
                    ObligationDate = ObligationDate,
                    ObligationExpiration = ObligationExpiration,
                    ObligationClass = new VM_ObligationClass() { ObligationClass = ObligationClass },
                    ObligationStatus = new VM_ObligationStatus() { ObligationStatus = ObligationStatus },
                    ObligationType = new VM_ObligationType() { ObligationTypeID = ObligationTypeID },
                    ObligationApplication = new VM_Application() { ApplicationID = ApplicationID },
                    ObligationTag = new VM_Tag() { TagID = TagID },
                    ObligationIssuer = new VM_User() { UserID = IssueUserID }, // IssueUserID  ЭМИТЕНТ (выпустивший облигацию)
                    ObligationHolder = new VM_User() { UserID = HolderUserID } // HolderUserID ДЕРЖАТЕЛЬ
                };
            }
        }
    }
}