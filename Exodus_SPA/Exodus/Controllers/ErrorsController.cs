using Exodus.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class ErrorsController : BaseController
    {
        [AllowAnonymous]
        public ActionResult PageNotFound(string aspxerrorpath)
        {
            return View(aspxerrorpath);
        }

        [AllowAnonymous]
        public ActionResult ServerError(string id)
        {
            ExodusException ex = Global.Cache.ExceptionGet(id) as ExodusException ?? new ExodusException();
            //
            return View(ex);
        }

        [AllowAnonymous]
        public ActionResult UnknownError(string id)
        {
            Exception ex = Global.Cache.ExceptionGet(id) as Exception ?? new Exception();
            //
            return View(ex);
        }


        [AllowAnonymous]
        //Message is idList devide by ";"
        public ActionResult ApplicationStartupExceptionList(string message)
        {
            List<Exception> exceptions = new List<Exception>();
            foreach (string id in message.Split(new char[] { ';' }))
            {
                Exception ex = Global.Cache.ExceptionGet(id);
                if (ex != null) { exceptions.Add(ex); }
            }
            //
            return View(exceptions);
        }

        [AllowAnonymous]
        public ActionResult Info(string backUrl, string message)
        {
            Tuple<string, string> urlMessage = new Tuple<string, string>(backUrl, message);
            // Show Info Page
            return View(urlMessage);
        }

        [AllowAnonymous]
        public ActionResult TagCanNotAddYourSelf(string backUrl)
        {
            return View(backUrl as object);
        }

        [AllowAnonymous]
        public ActionResult TagNotFound()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult UserNotFound()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult IncorrectLogin()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult UserAlreadyExist()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult IncorrectInviteCode()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult ApplicationNotFound()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult BankNotFound()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult CardNotFound()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Registration()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult LocalisationInit(string message)
        {
            LocalisationInitException ex = new LocalisationInitException(message);
            return View(ex);
        }
    }
}