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
    
    public partial class stp_PaymentAccounts_ByUserID_Result
    {
        public long AccountID { get; set; }
        public int AccountTypeID { get; set; }
        public string AccountTypeName { get; set; }
        public string AccountDetails { get; set; }
        public long UserID { get; set; }
        public long UserInvitedBy { get; set; }
        public string UserGuid { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public int UserTypeID { get; set; }
        public int UserStatusID { get; set; }
        public string UserStatusMessage { get; set; }
        public string UserAbout { get; set; }
        public System.DateTime UserRegistered { get; set; }
        public int UserRegistrationSource { get; set; }
        public long UserFlags { get; set; }
        public string AvatarBIG { get; set; }
        public string AvatarSMALL { get; set; }
        public Nullable<long> CreditCardID { get; set; }
        public Nullable<long> CreditCardTypeID { get; set; }
        public string CreditCardTypeName { get; set; }
        public Nullable<long> BankID { get; set; }
        public string BankName { get; set; }
        public string CardNumber { get; set; }
        public Nullable<System.DateTime> CardValidTill { get; set; }
        public string CardAdditionalInfo { get; set; }
    }
}