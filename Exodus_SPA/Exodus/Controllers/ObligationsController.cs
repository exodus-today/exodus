using Exodus.Domain;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.DTO;

namespace Exodus.Controllers
{
    public class ObligationsController : BaseController
    {

        [HttpPost]
        public ActionResult Add(FormCollection fc)
        {
            VM_Obligation obligation = new VM_Obligation()
            {
                IntentionID = Convert.ToInt64(fc["IntentionID"]), // TODO
                ObligationKind = new VM_ObligationKind { ObligationKindID = (EN_ObligationKind)Convert.ToInt64(fc["ObligationKindID"]) },
                ObligationCurrency = (En_Currency)Convert.ToInt32(fc["CurrencyID"]),
                AmountPerPayment = Convert.ToDecimal(fc["AmountPerPayment"]),
                AmountDue = Convert.ToDecimal(fc["AmountDue"]),
                AmountTotal = Convert.ToDecimal(fc["AmountTotal"]),
                IsActive = Convert.ToBoolean(fc["IsActive"]),
                ObligationPeriod = (EN_Period)Convert.ToInt32(fc["ObligationPeriodID"]),
                ObligationDate = DateTime.Parse(fc["ObligationDate"]),
                ObligationExpiration = DateTime.Parse(fc["ObligationExpiration"]),
                ObligationClass = new VM_ObligationClass()   {  ObligationClass = (EN_ObligationClass)Convert.ToInt32(fc["ObligationClass"])  },
                ObligationStatus = new VM_ObligationStatus() {  ObligationStatus = (EN_ObligationStatus)Convert.ToInt32(fc["ObligationStatus"]) },
                ObligationType = new VM_ObligationType()     {   ObligationTypeID = (EN_ObligationType)Convert.ToInt32(fc["ObligationType"])  },
                ObligationApplication = new VM_Application() { ApplicationID = int.Parse(fc["ApplicationID"]) },
                ObligationTag = new VM_Tag()                { TagID = long.Parse(fc["TagID"]) },
                ObligationIssuer = new VM_User() { UserID = long.Parse(fc["IssueUserID"]) },
                ObligationHolder = new VM_User() { UserID = long.Parse(fc["HolderUserGuid"]) }                 
            };

            var rez = _DL.Obligation.Add.Obligation(obligation);
            return GetJson(rez);
        }

        [HttpPost]
        public ActionResult Update(FormCollection fc)
        {
            VM_Obligation obligation = new VM_Obligation()
            {
                IntentionID = Convert.ToInt64(fc["IntentionID"]), // TODO
                ObligationKind = new VM_ObligationKind { ObligationKindID = (EN_ObligationKind)Convert.ToInt64(fc["ObligationKindID"]) },
                ObligationCurrency = (En_Currency)Convert.ToInt32(fc["CurrencyID"]),
                AmountPerPayment = Convert.ToDecimal(fc["AmountPerPayment"]),
                AmountDue = Convert.ToDecimal(fc["AmountDue"]),
                AmountTotal = Convert.ToDecimal(fc["AmountTotal"]),
                IsActive = Convert.ToBoolean(fc["IsActive"]),
                ObligationPeriod = (EN_Period)Convert.ToInt32(fc["ObligationPeriodID"]),
                ObligationDate = DateTime.Parse(fc["ObligationDate"]),
                ObligationExpiration = DateTime.Parse(fc["ObligationExpiration"]),
                ObligationClass = new VM_ObligationClass() { ObligationClass = (EN_ObligationClass)Convert.ToInt32(fc["ObligationClass"]) },
                ObligationStatus = new VM_ObligationStatus() { ObligationStatus = (EN_ObligationStatus)Convert.ToInt32(fc["ObligationStatus"]) },
                ObligationType = new VM_ObligationType() { ObligationTypeID = (EN_ObligationType)Convert.ToInt32(fc["ObligationType"]) }
            };

           // var rez = _DL.Obligation.Update.Obligation(obligation);
            return Json(0);
        }

        [HttpPost]
        public ActionResult Delete(long ObligationID)
        { 
            var rez = _DL.Obligation.Delete.Obligation(ObligationID);
            return Json(rez);
        }

        [HttpGet]
        public JsonResult GetByID(long ObligationID)
        {
            var rez = _DL.Obligation.Get.ByID(ObligationID);
            if (rez == null) { return GetJson(EN_ErrorCodes.ObligationNotFound); }
            var obligation = AutoMapper.Mapper.Map<VM_Obligation, ObligationDTO>(rez);
            obligation.IsExpired = obligation.ObligationExpiration <= DateTime.Now;
            return GetJson(obligation);
        }

        [HttpGet]
        public JsonResult Get_ByHolderID(long UserID)
        {
            if (_DL.User.Get.ByID(UserID) == null) { return GetJson(EN_ErrorCodes.UserNotFound); }
            var list = _DL.Obligation.Get.ByHolderID(UserID).Select(a => AutoMapper.Mapper.Map<VM_Obligation, ObligationDTO>(a)).ToList();
            list.ForEach(a => a.IsExpired = a.ObligationExpiration <= DateTime.Now);
            return GetJson(list);
        }

        [HttpGet]
        public JsonResult Get_ByIssuerID(long UserID)
        {
            if (_DL.User.Get.ByID(UserID) == null) { return GetJson(EN_ErrorCodes.UserNotFound); }
            var list = _DL.Obligation.Get.ByIssuerID(UserID).Select(a => AutoMapper.Mapper.Map<VM_Obligation, ObligationDTO>(a)).ToList();
            list.ForEach(a => a.IsExpired = a.ObligationExpiration <= DateTime.Now);
            return GetJson(list);
        }
    }
}