using Exodus.Enums;
using Exodus.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Models.Search
{
    public class TagSearch
    {
        public long TagID { get; set; }
        public string NameEng { get; set; } = String.Empty;
        public string NameRus { get; set; } = String.Empty;
        public string Name
        {
            get
            {
                if (Global.Global.Language.ToLower() == "ru")
                { return String.IsNullOrEmpty(NameRus) ? NameEng : NameRus; }
                else
                { return String.IsNullOrEmpty(NameEng) ? NameRus : NameEng; }
            }
        }
        public string ApplicationUrl
        {
            get
            {
                return $"/Application/{PageHelper.GetApplicationUrl(ApplicationType)}?TagID={TagID}";
            }
        }
        public string Description { get; set; } = String.Empty;
        public long Owner_UserID { get; set; }
        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public string Owner_Avatar { get { return Global.Cache.dicUserAvatars[Owner_UserID].AvatarSmall; } }
        public int ApplicationID { get; set; }
        public EN_ApplicationType ApplicationType { get { return (EN_ApplicationType)ApplicationID;  } }
        public EN_TagPeriod Period { get; set; }
        public string PeriodNameRus { get; set; }
        public string PeriodNameEng { get; set; }
        public En_Currency TagCurrency { get; set; }
        public int DaysLeft { get; set; }
        public En_CurrentStatus OwnerStatus { get { return (En_CurrentStatus)OwnerStatusID; } }
        public int OwnerStatusID { get; set; }
        public decimal Intentions_Total { get; set; }
        public decimal Obligations_Total { get; set; }
        public decimal Intentions_Persent { get; set; }
        public decimal Obligations_Persent { get; set; }

    }
}