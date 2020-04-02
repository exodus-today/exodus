using Exodus.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.ViewModels;
using Exodus.Domain;
using Exodus.Enums;
using System.Xml;
using Exodus.Extensions;

namespace Exodus.Controllers
{
    public class EventController : BaseController
    {
        [HttpGet]
        public ActionResult EventList()
        {
            return PartialView("~/Views/Partial/Event/EventList.cshtml");
        }
    }
}