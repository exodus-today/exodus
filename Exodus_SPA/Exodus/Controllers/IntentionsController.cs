using AutoMapper;
using Exodus.Domain;
using Exodus.DTO;
using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.View_InputModels;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class IntentionsController : BaseController
    {      
        [HttpGet]
        public ActionResult Dispatcher(EN_ViewMenuItem menuItem = EN_ViewMenuItem.MyIntentions, long itemID = -1)
        {
            var model = new VIM_Dispatcher(menuItem, itemID); 
            return View(model);
        }

        [HttpGet]
        public PartialViewResult Dashboard()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult Notifications()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult MyObligations(long itemID = 0)
        {
            return PartialView(itemID);
        }

        [HttpGet]
        public PartialViewResult FulFillObligation()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult FulFillObligationRequest()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult ObligationsInMyFavour(long itemID = 0)
        {
            return PartialView(itemID);
        }

        [HttpGet]
        public PartialViewResult Calendar()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult MyIntentions(long itemID = 0)
        {
            return PartialView(itemID);
        }


        [HttpGet]
        public ActionResult FulFill()
        {
            return View(CurrentUser);
        }

        [HttpGet]
        public PartialViewResult Reports()
        {
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult FriendIntentions(long itemID = 0)
        {
            return PartialView(itemID);
        }

        [HttpGet]
        public PartialViewResult Transactions(long itemID = 0)
        {
            return PartialView(itemID);
        }
    }
}