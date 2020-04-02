using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Exodus.DTO_Api
{
    public class DTO_CreditCard
    {
        public long CadrID { get; set; } = 0;
        public long UserID { get; set; }
        public EN_CardType TypeID { get; set; }
        public long BankID { get; set; }
        public string BankName { get; set; }
        public string CardNumber { get; set; }
        public int ValidTillMonth { get; set; }
        public int ValidTillYear { get; set; }
        public string AdditionalInfo { get; set; }

        [JsonIgnore]
        public VM_BankCard ViewModel
        {
            get
            {
                try
                {
                    return new VM_BankCard()
                    {
                        CardID = CadrID,
                        CardValidTill = DateTime.Parse(string.Format("{0}/{1}", ValidTillMonth, ValidTillYear)),
                        UserID = UserID,
                        TypeID = TypeID,
                        BankID = BankID,
                        BankName = BankName ?? "",
                        CardNumber = CardNumber,
                        AdditionalInfo = AdditionalInfo ?? "",
                    };
                }
                catch (Exception ex)
                { throw ex; }
            }
        }

        public void ValidateData()
        {
            long lg = 0;
            DateTime dt = new DateTime();
            if (!DateTime.TryParse(string.Format("{0}/{1}", ValidTillMonth, ValidTillYear), out dt))
            { throw new ValidationException("Date in not valid");  }
            if (string.IsNullOrEmpty(CardNumber) || string.IsNullOrWhiteSpace(CardNumber))
            {  throw new ValidationException("Card Number is not valid"); }
            if (!long.TryParse(CardNumber.Trim().Replace(" ", ""), out lg))
            {  throw new ValidationException("Card Number is not valid"); }
            if (BankID < 0)
            { throw new BankNotFoundException();  }
            if (CadrID < 0)
            { throw new CardNotFoundException(); }
        }
    }
}