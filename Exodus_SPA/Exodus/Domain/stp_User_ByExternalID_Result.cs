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
    
    public partial class stp_User_ByExternalID_Result
    {
        public long UserID { get; set; }
        public long UserInvitedBy { get; set; }
        public string UserGuid { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string AvatarBIG { get; set; }
        public string AvatarSMALL { get; set; }
        public string ExternalUserID { get; set; }
        public int UserTypeID { get; set; }
        public string UserTypeName { get; set; }
        public string UserTypeComments { get; set; }
        public int UserStatusID { get; set; }
        public string UserStatusName { get; set; }
        public string UserStatusComment { get; set; }
        public string UserStatusMessage { get; set; }
        public string UserAbout { get; set; }
        public System.DateTime UserRegistered { get; set; }
        public int RegistrationSourceID { get; set; }
        public string RegistrationSourceName { get; set; }
        public string RegistrationSourceComment { get; set; }
        public long UserFlags { get; set; }
        public Nullable<long> HelpDetailID { get; set; }
        public Nullable<int> UserHelpPeriodID { get; set; }
        public string UserHelpPeriodName { get; set; }
        public string UserHelpPeriodComment { get; set; }
        public Nullable<decimal> UserHelpAmountRequired { get; set; }
        public Nullable<int> CurrencyID { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyName { get; set; }
        public string UserHelpDetails { get; set; }
        public Nullable<System.DateTime> UpdatedDateTime { get; set; }
    }
}
