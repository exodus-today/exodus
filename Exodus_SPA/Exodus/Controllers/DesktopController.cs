using Exodus.Domain;
using Exodus.Enums;
using Exodus.Helpers;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class DesktopController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult OpenTag(string TagID)
        {
            var tag = _DL.Tag.Get.ByID(Convert.ToInt64(TagID));
            string url = $"/Application/{PageHelper.GetApplicationUrl((EN_ApplicationType)tag.ApplicationID)}?TagID={tag.TagID}";
            return View((object)url);
        }
    }
}