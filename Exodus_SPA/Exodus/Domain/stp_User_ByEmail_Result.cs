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
    
    public partial class stp_User_ByEmail_Result
    {
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
        public string ExternalUserID { get; set; }
    }
}
