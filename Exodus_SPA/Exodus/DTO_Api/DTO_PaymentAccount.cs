using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.ViewModels;
using Newtonsoft.Json;

namespace Exodus.DTO_Api
{
    public class DTO_PaymentAccount
    {
        public long AccountID { get; set; }
        public En_AccountType AccountType { get; set; }
        public string AccountDetails { get; set; }
        public long UserID { get; set; }

        // Generate For DL
        [JsonIgnore]
        public VM_PaymentAccount ViewModel
        {
            get
            {
                return new VM_PaymentAccount()
                {
                    AccountID = AccountID,
                    User = new VM_User() { UserID = UserID },
                    AccountDetails = AccountDetails,
                    AccountType = AccountType,
                    AccountTypeName = AccountType.ToString(),
                };
            }
        }
    }
}