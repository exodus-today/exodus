using Exodus.Domain;
using Exodus.Enums;
using Exodus.Helpers;
using Exodus.Models;
using Exodus.Security;
using Exodus.Service;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using static Exodus.Security.Security;
using static Exodus.Service._SL;

namespace Exodus.Controllers
{

    public class AccountController : BaseController
    {
        #region Partials

        [HttpGet]
        public PartialViewResult View_Navigation()
        {
            return PartialView("~/Views/Partial/Account/Navigation.cshtml", CurrentUser);
        }

        [HttpGet]
        public PartialViewResult View_UserStatus()
        {
            return PartialView("~/Views/Partial/Account/UserStatus.cshtml", CurrentUser);
        }

        [HttpGet]
        public PartialViewResult View_UserProfile()
        {
            return PartialView("~/Views/Partial/Account/UserProfile.cshtml", CurrentUser);
        }

        #endregion
    }
}