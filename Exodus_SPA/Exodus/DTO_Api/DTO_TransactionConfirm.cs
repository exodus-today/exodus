using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_TransactionConfirm
    {
        public long TransactionID { get; set; }
        public bool isConfirmedBySender { get; set; }
        public bool IsConfirmedByReceiver { get; set; }
    }
}