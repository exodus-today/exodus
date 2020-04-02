using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.ViewModels;
using Newtonsoft.Json;
using Exodus.Domain;
using Exodus.Extensions;

namespace Exodus.DTO_Api
{
    public class DTO_Transaction
    {
        public int ApplicationID { get; set; } = EN_ApplicationType.UserPublicProfile.ToInt();
        public long UserReceiver { get; set; }
        public long UserSender { get; set; }
        public En_Currency Currency { get; set; }
        public decimal Amount { get; set; }
        public long TagID { get; set; } = -1;
        public EN_TransferType TransferType { get; set; }
        public int PaymentAccountID { get; set; } = -1;
        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public int ObligationID { get; set; } = -1;
        public string TransactionMemo { get; set; }

        [JsonIgnore]
        public VM_Transaction ViewModel
        {
            get
            {
                var tag = _DL.Tag.Get.ByID(TagID);
                var transaction = new VM_Transaction()
                {
                    PaymentAccount = PaymentAccountID == -1 ? null : new VM_PaymentAccount { AccountID = PaymentAccountID },
                    TransferType = TransferType,
                    TransactionAmount = Amount,
                    TransactionCurrency = Currency,
                    TransactionSender = new VM_User() { UserID = UserSender },
                    IsConfirmed = false,
                    IsConfirmedByReceiver = false,
                    IsConfirmedBySender = false,
                    TransactionDateTime = TransactionDate,
                    TransactionReceiver = new VM_User() { UserID = UserReceiver },
                    Tag = TagID == -1 ? null : new VM_Tag() { TagID = TagID },
                    Application = ApplicationID == -1 ? null : new VM_Application { ApplicationID = tag == null ? ApplicationID : tag.ApplicationID },
                    Obligation = ObligationID == -1 ? null : new VM_Obligation() { ObligationID = ObligationID },
                    TransactionMemo = this.TransactionMemo
                };
                return transaction;
            }
        }
    }
}