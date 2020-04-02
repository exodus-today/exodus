using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_ObligationRouting
    {
        public long RoutingID { get; set; } // Формируется по ходу
        public long ObligationID { get; set; }
        public EN_ObligationRoutingType RoutingTypeID { get; set; }
        public long RoutedByUserID { get; set; }
        public long RoutedToUserID { get; set; }
        public EN_TransferType TransferTypeID { get; set; }
        public En_AccountType AccountTypeID { get; set; }
        public long? AccountID { get; set; }
        public string AccountCustomDetails { get; set; }
        public long? TransferUserID { get; set; }
        public string TransferUserCustomDetails { get; set; }
        public decimal TransferAmount { get; set; }
        public EN_TransferType TransferAmountCurrency { get; set; }
        public DateTime? DesiredEndDate { get; set; }
        public DateTime? RoutingDT { get; set; } = DateTime.Now;
    }
}