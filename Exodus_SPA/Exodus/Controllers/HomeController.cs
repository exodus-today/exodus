using Exodus.Domain;
using Exodus.Exceptions;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class HomeController : BaseController
    {
        [AllowAnonymous]
        public ActionResult AskLogin()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            return Redirect("http://www.exodus.social");
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult TokenAction(string token)
        {
            var tokenAction = _DL.GlobalDL.TokenActionGet(token);
            if (tokenAction == null) { throw new TokenActionNotFoundException(); }
            else if (tokenAction.ExpirationDate.Ticks <= DateTime.Now.Ticks)
            { throw new TokenExpirationDateFaledException(); }
            //
            switch (tokenAction.ActionName)
            {
                case Models.TokenAction.ChangePass:
                    return View("~/Views/User/ChangePassword.cshtml", tokenAction);
            }
            return View("");
        }
    }
}