using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.Enums;
using Exodus.ViewModels;
using Newtonsoft.Json;
using Exodus.Exceptions;
using Exodus.Domain;

namespace Exodus.DTO_Api
{ 
    public class DTO_Intention
    {
        public long IntentionID { get; set; } = 0;
        public EN_ObligationType ObligationTypeID { get; set; }
        public long ObligationKindID { get; set; }
        public  EN_Period Period { get; set; }
        public EN_IntentionTerm IntentionTerm { get; set; }
        public long IssuerUserID { get; set; }
        public long HolderUserID { get; set; }
        public long TagID { get; set; } = 0;
        public int ApplicationID { get; set; }
        public decimal IntentionAmount { get; set; }
        public En_Currency CurrencyID { get; set; }
        public int IntentionDurationMonths { get; set; }
        public DateTime IntentionStartDate { get; set; }
        public DateTime IntentionEndDate { get; set; }
        public int IntentionDayOfWeek { get; set; }
        public int IntentionDayOfMonth { get; set; }
        public string IntentionMemo { get; set; }
        public bool IntentionIsActive { get; set; }

        [JsonIgnore]
        public bool IsModelValid
        {
            get
            {
                try { ValidateData(); return true; }
                catch (Exception) { return false; }
            }
        }

        [JsonIgnore]
        public VM_Intention ViewModel
        {
            get
            {
                var tag = _DL.Tag.Get.ByID(TagID);
                //
                return new VM_Intention()
                {
                    IntentionID = IntentionID,
                    ObligationType = new VM_ObligationType { ObligationTypeID = ObligationTypeID },
                    ObligationKind = new VM_ObligationKind { ObligationKindID = (EN_ObligationKind)ObligationKindID },
                    Period = Period,
                    IntentionTerm = IntentionTerm,
                    IntentionIssuer = new VM_User { UserID = IssuerUserID },
                    IntentionHolder = new VM_User { UserID = HolderUserID },
                    IntentionTag = tag == null ? null : tag,
                    IntentionApplication = new VM_Application { ApplicationID = ApplicationID },
                    IntentionAmount = IntentionAmount,
                    CurrencyID = CurrencyID,
                    IntentionDurationMonths = IntentionDurationMonths,
                    IntentionStartDate = IntentionStartDate,
                    IntentionEndDate = tag == null ? DateTime.Now.AddYears(3) : tag.EndDate,
                    IntentionIsActive = IntentionIsActive,
                    IntentionDayOfWeek = IntentionDayOfWeek,
                    IntentionDayOfMonth = IntentionDayOfMonth,
                    IntentionMemo = IntentionMemo,
                };
            }
        }

        public void ValidateData(bool isNew = false)
        {
            if (IntentionStartDate.Ticks > IntentionEndDate.Ticks)
            { throw new ValidationException("Start date not valid"); }
            if (IntentionEndDate.Ticks < DateTime.Now.Ticks)
            { throw new ValidationException("End date not valid"); }
            if (_DL.User.Get.ByID(IssuerUserID) == null || _DL.User.Get.ByID(HolderUserID) == null)
            { throw new UserNotFoundException(); }
            if (IntentionAmount < 0)
            { throw new ValidationException("Amount can not be less then zero"); }
            if (Period == EN_Period.Monthly && IntentionDurationMonths <= 0)
            { throw new ValidationException("Duration Mounth can not be less then 1"); }
            if (!isNew &&_DL.Intention.Get.ByID(IntentionID) == null)
            { throw new IntentionNotFoundException(); }
        }
    }
}