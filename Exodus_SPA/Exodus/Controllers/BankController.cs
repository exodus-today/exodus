using Exodus.Domain;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class BankController : BaseController
    {
        [HttpGet]
        public JsonResult GetBankNameByCard(string cardNumber)
        {
            cardNumber = (cardNumber.Length > 6) ? cardNumber.Substring(0, 6) + "%" : cardNumber + "%";
            //
            return GetJson(_DL.Banks.Get.BankNamesByCardNumber(cardNumber, 100));
        }
    }
}