using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Domain;
using Exodus.Enums;
using Exodus.ViewModels;
using Newtonsoft.Json;

namespace Exodus.DTO_Api
{
    public class DTO_Tag
    { 
        public long TagOwnerID { get; set; }
        public string NameEng { get; set; }
        public string NameRus { get; set; }
        public string Description { get; set; }
        public EN_TagAccessType AccessType { get; set; }              
        public EN_TagPeriod  Period { get; set; }
        public int ApplicationID { get; set; }
        public EN_ApplicationType ApplicationType { get { return (EN_ApplicationType)ApplicationID;  } }
        public DateTime EndDate { get; set; }
        public int DayOfMonth { get; set; }
        public int DayOfWeek { get; set; }
        public decimal TotalAmount { get; set; }
        public int  TotalAmountCurrencyID { get; set; }
        public decimal MinIntentionAmount { get; set; }
        public int MinIntentionCurrencyID { get; set; }
        public long DefaultIntentionOwnerID { get; set; }

        [JsonIgnore]
        public VM_Tag ViewModel
        {
            get
            {
                return new VM_Tag()
                {
                    MinIntentionCurrencyID = MinIntentionCurrencyID,
                    MinIntentionAmount = MinIntentionAmount,
                    TotalAmountCurrencyID = TotalAmountCurrencyID,
                    TotalAmount = ApplicationType == EN_ApplicationType.H20 ? 0 : TotalAmount,
                    DayOfWeek = DayOfWeek == 0 ? 1 : DayOfWeek,
                    DayOfMonth = DayOfMonth == 0 ? 1 : DayOfMonth,
                    EndDate = EndDate,
                    ApplicationID = ApplicationID,
                    Period = Period,
                    Owner_UserID = TagOwnerID,
                    NameRus = NameRus,
                    NameEng = NameEng,
                    AccessType = AccessType,
                    Description = Description,
                    Type = EN_TagType.UserDefined,
                    DefaultIntentionOwner = new VM_User() { UserID = DefaultIntentionOwnerID } 
                };
            }
        }
    }
}