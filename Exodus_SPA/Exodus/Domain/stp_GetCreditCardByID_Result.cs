//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Exodus.Domain
{
    using System;
    
    public partial class stp_GetCreditCardByID_Result
    {
        public long CreditCardID { get; set; }
        public long fk_UserID { get; set; }
        public long fk_CardTypeID { get; set; }
        public long fk_BankID { get; set; }
        public string CardNumber { get; set; }
        public System.DateTime CardValidTill { get; set; }
        public string CardAdditionalInfo { get; set; }
        public Nullable<long> BankID { get; set; }
        public string BankName { get; set; }
    }
}
