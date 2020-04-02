using Exodus.Enums;
using Exodus.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_UserStatusUpdate
    {
        public string UserStatusMessage { get; set; }
        public En_CurrentStatus UserCurrentStatus { get; set; }
        public En_Currency AmountEmergencyCurrency { get; set; }
        public En_Currency AmountRegularCurrency { get; set; }
        public decimal HelpSummRegular { get; set; }
        public decimal HelpSummEmergency { get; set; }
        public En_HelpPeriods UserHelpPeriod { get; set; }
        public long UserID { get; set; }

        [JsonIgnore]
        public VM_UserHelpDetail ViewModel
        {
            get
            {
                return new VM_UserHelpDetail()
                {
                    UpdatedDateTime = DateTime.Now,
                    UserHelpAmountCurrency = (UserCurrentStatus == En_CurrentStatus.I_AM_OK) ? 0 : ((UserCurrentStatus == En_CurrentStatus.I_AM_PARTIALLY_OK) ? AmountRegularCurrency : AmountEmergencyCurrency),
                    UserHelpAmountRequired = (UserCurrentStatus == En_CurrentStatus.I_AM_OK) ? 0 : ((UserCurrentStatus == En_CurrentStatus.I_AM_PARTIALLY_OK) ? HelpSummRegular : HelpSummEmergency),
                    UserHelpDetails = (UserCurrentStatus == En_CurrentStatus.I_NEED_HELP) ? UserStatusMessage : "",
                    UserHelpPeriod = (UserCurrentStatus == En_CurrentStatus.I_AM_OK) ? En_HelpPeriods.Undefined : UserHelpPeriod,
                    UserID = UserID
                };
            }
        }
    }
}