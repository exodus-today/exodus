using Exodus.Domain;
using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.Helpers;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class PaymentAccountController : BaseController
    {
        #region PAYMENT ACCOUNT

        [HttpPost]
        public ActionResult PaymentAccountAdd(VM_PaymentAccount paymentAccount)
        {
            paymentAccount.User = CurrentUser;
            paymentAccount.AccountTypeName = paymentAccount.AccountType.ToString();
            switch (paymentAccount.AccountType)
            {
                case En_AccountType.Bitcoin: case En_AccountType.PayPal: case En_AccountType.WebMoney:
                    return GetJson(_DL.PaymentAccount.Add.New(paymentAccount));
                default: throw new IncorrectPaymentAccountTypeException();
            }
        }

        [HttpPost]
        public ActionResult PaymentAccountDelete(int AccountID)
        {
            if (_DL.PaymentAccount.Get.ByID(AccountID) == null) { throw new PaymentAccountNotFoundException(); }
            return GetJson(_DL.PaymentAccount.Delete.DeleteAccount(AccountID));
        }

        [HttpPost]
        public ActionResult PaymentAccountUpdate(VM_PaymentAccount paymentAccount)
        {
            if (_DL.PaymentAccount.Get.ByID((int)paymentAccount.AccountID) == null) { throw new PaymentAccountNotFoundException(); }
            return GetJson(_DL.PaymentAccount.Update.UpdateAccount(paymentAccount));
        }

        [HttpPost]
        public ActionResult BankCardAdd(VM_BankCard card)
        {
            card.UserID = CurrentUser.UserID;
            card.AdditionalInfo = card.CardNumber;
            return GetJson(_DL.Cards.Add.AddCard(card));
        }

        [HttpPost]
        public ActionResult BankCardUpdate(VM_BankCard card)
        {
            card.UserID = CurrentUser.UserID;
            card.AdditionalInfo = card.CardNumber;
            if (_DL.Cards.Get.ByID((int)card.CardID) == null) { throw new CardNotFoundException(); }
            return GetJson(_DL.Cards.Update.UpdateCard(card));
        }

        // TEST FUNC
        [HttpPost]
        public ActionResult BankCardDelete(int CreditCardID)
        {
            if (_DL.Cards.Get.ByID(CreditCardID) == null) { throw new CardNotFoundException(); }
            return GetJson(_DL.Cards.Delete.DeleteCard(CreditCardID));
        }

        #endregion

        #region Partial

        /// <summary>
        /// Get add form view
        /// </summary>
        /// <param name="form">Account Type</param>
        /// <returns></returns>
        [HttpGet]
        public PartialViewResult PaymentAccountAddForm(En_AccountType type)
        {
            return PartialView(PageHelper.PaymentAccountAddFormName(type));
        }

        /// <summary>
        /// Get update form view
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        [HttpGet]
        public PartialViewResult PaymentAccountUpdateForm(En_AccountType type)
        {
            return PartialView(PageHelper.PaymentAccountUpdateFormName(type));
        }

        [HttpGet]
        public PartialViewResult PaymentAccountList()
        {
            return PartialView(_DL.PaymentAccount.Get.UserPaymentAccounts(CurrentUser.UserID));
        }

        [HttpGet]
        public JsonResult PaymentAccountList_JS(long UserID)
        {
            return Json(_DL.PaymentAccount.Get.UserPaymentAccounts(UserID), JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReturnPartial(string name, object param = null)
        {
            if (String.IsNullOrEmpty(name)) { throw new ArgumentNullException("Name is null or empty"); }
            switch(name)
            {
                case "PaymentAccountUpdateForm": return PartialView(PageHelper.PaymentAccountUpdateFormName((En_AccountType)param));
                case "PaymentAccountAddForm": return PartialView(PageHelper.PaymentAccountAddFormName((En_AccountType)param));
                case "PaymentAccountList": return PartialView(_DL.PaymentAccount.Get.UserPaymentAccounts(CurrentUser.UserID));
                default: return PartialView(name);
            }
        }

        [HttpGet]
        public PartialViewResult PayPalAddForm()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult WebMoneyAddForm()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult BitcoinAddForm()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult BankCardAddForm()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult BankAccountAddForm()
        {
            return PartialView();
        }

        #endregion
    }
}