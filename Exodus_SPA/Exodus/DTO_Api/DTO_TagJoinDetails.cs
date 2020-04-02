using Exodus.Domain;
using Exodus.Enums;
using Exodus.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_TagJoinDetails
    {
        public long InviterUserID { get; set; } = 0;
        public long InvitedUserID { get; set; }
        public long TagID { get; set; }
        public decimal IntentionAmount { get; set; }
        public En_Currency IntentionCurrencyID { get; set; }
        public EN_IntentionTerm IntentionTerm { get; set; } = EN_IntentionTerm.Indefinitely;
        public EN_Period Period { get; set; } = EN_Period.Once;

        [JsonIgnore]
        public VM_Intention IntentionModel
        {
            get
            {
                var tag = _DL.Tag.Get.ByID(TagID);
                //
                VM_Intention intention = new VM_Intention()
                {
                    CurrencyID = IntentionCurrencyID,
                    IntentionAmount = IntentionAmount,
                    ObligationType = new VM_ObligationType { ObligationTypeID = EN_ObligationType.Money },
                    ObligationKind = _DL.Obligation.Get.KindDefault_ByAppID(tag.ApplicationID),
                    Period = Period,
                    IntentionTerm = IntentionTerm,
                    IntentionIssuer = new VM_User() { UserID = InvitedUserID },
                    IntentionHolder = new VM_User() { UserID = InviterUserID },
                    IntentionTag = tag,
                    IntentionApplication = new VM_Application { ApplicationID = tag.ApplicationID },
                    IntentionDurationMonths = 0,
                    IntentionStartDate = DateTime.Now,
                    IntentionEndDate = DateTime.MaxValue,
                    IntentionIsActive = true
                };
                return intention;
            }
        }

    }
}