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
    
    public partial class stp_Obligation_KindDefault_ByAppID_Result
    {
        public long ObligationKindID { get; set; }
        public string ObligationNameEng { get; set; }
        public string ObligationNameRus { get; set; }
        public string ObligationComment { get; set; }
        public int fk_ApplicationID { get; set; }
        public Nullable<bool> IsDefaultAppKind { get; set; }
    }
}
