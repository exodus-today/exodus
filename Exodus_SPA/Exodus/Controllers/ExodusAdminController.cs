using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Exodus.Domain;
using Exodus.Exceptions;
using Exodus.Helpers;

namespace Exodus.Controllers
{
    public class ExodusAdminController : BaseController
    {
        [HttpGet]
        public ActionResult LocalisationUpdate()
        {
            // Old
            var oldLangs = Global.Localisation.Languages;
            // Update
            Global.Localisation.Update();
            // New
            var newLangs = Global.Localisation.Languages;
            StringBuilder builder = new StringBuilder();
            foreach (var item in oldLangs.Keys)
            {
                var fromOld = oldLangs[item]; // old values
                var fromNew = newLangs[item]; // new values
                // add to builder
                builder.Append($"------------LANGUAGE {item.TwoLetterISOLanguageName.ToUpper()}------------<br><br>");
                foreach (var key in fromOld.Keys)
                {
                    try
                    {
                        if(fromNew[key] != fromOld[key])
                        { builder.Append($"KEY: {key} UPDATED {fromOld[key]} ==> {fromNew[key]}<br>"); }
                    }
                    catch
                    {  builder.Append($"KEY: {key} DELETED OR RENAMED<br>"); }
                }
                // Added
                foreach (var key in fromNew.Keys.Where(a => !fromOld.ContainsKey(a)))
                { builder.Append($"KEY: {key} ADD {fromNew[key]}<br>"); }
            }
            return View(builder);
        }

        [HttpGet]
        public ActionResult SpeedTest()
        {
            Stopwatch clock = Stopwatch.StartNew();
            var ran = new Random();
            for (int i = 0; i < 20; i++)
            {
                long id = ran.Next(0, 10000);
                _DL.Tag.Get.ByID(id);
                //_DL.User.Get.ByID(id);
                _DL.Transactions.Get.ByID(id);
            }
            return View(clock.Elapsed.TotalMilliseconds);
        }
    }
}