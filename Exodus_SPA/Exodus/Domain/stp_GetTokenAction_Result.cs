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
    
    public partial class stp_GetTokenAction_Result
    {
        public long ID { get; set; }
        public string Token { get; set; }
        public System.DateTime CreationDate { get; set; }
        public Nullable<System.DateTime> ExpirationDate { get; set; }
        public string Action { get; set; }
        public Nullable<long> UserID { get; set; }
    }
}
