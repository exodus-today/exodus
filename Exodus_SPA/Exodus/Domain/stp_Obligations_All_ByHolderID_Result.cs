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
    
    public partial class stp_Obligations_All_ByHolderID_Result
    {
        public long ObligationID { get; set; }
        public long ObligationKindID { get; set; }
        public string ObligationNameEng { get; set; }
        public string ObligationNameRus { get; set; }
        public string ObligationComment { get; set; }
        public int CurrencyID { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyName { get; set; }
        public decimal AmountPerPayment { get; set; }
        public decimal AmountDue { get; set; }
        public decimal AmountTotal { get; set; }
        public bool IsActive { get; set; }
        public int PeriodID { get; set; }
        public string PeriodNameEng { get; set; }
        public string PeriodNameRus { get; set; }
        public string PeriodComment { get; set; }
        public System.DateTime ObligationDate { get; set; }
        public Nullable<System.DateTime> ObligationExpiration { get; set; }
        public long ObligationClassID { get; set; }
        public string ObligationClassNameEng { get; set; }
        public string ObligationClassNameRus { get; set; }
        public string ObligationClassComment { get; set; }
        public int ObligationStatusID { get; set; }
        public string ObligationStatusNameEng { get; set; }
        public string ObligationStatusNameRus { get; set; }
        public string ObligationStatusComment { get; set; }
        public int ObligationTypeID { get; set; }
        public string ObligationTypeNameEng { get; set; }
        public string ObligationTypeNameRus { get; set; }
        public string ObligationTypeComment { get; set; }
        public Nullable<long> TagID { get; set; }
        public string TagNameEng { get; set; }
        public string TagNameRus { get; set; }
        public string TagDescription { get; set; }
        public Nullable<int> ApplicationID { get; set; }
        public string ApplicationNameEng { get; set; }
        public string ApplicationNameRus { get; set; }
        public string ApplicationDescription { get; set; }
        public Nullable<bool> ApplicationIsActive { get; set; }
        public long IssuerUserID { get; set; }
        public string IssuerUserFirstName { get; set; }
        public string IssuerUserLastName { get; set; }
        public long HolderUserID { get; set; }
        public string HolderUserFirstName { get; set; }
        public string HolderUserLastName { get; set; }
        public Nullable<long> IntentionID { get; set; }
    }
}
