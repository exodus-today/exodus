using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.ViewModels;
using Exodus.Service;

namespace Exodus.Controllers
{
    public class SearchController : BaseController
    {
        public ActionResult Index(string query)
        {
            VM_SearchQuery searchQuery = new VM_SearchQuery();
            searchQuery.Query = query;

            return PartialView("Index", searchQuery);
        }

        public JsonResult Tags(string query)
        {
            return GetJson(_SL.Search.TagsByString(query));
        }

        public JsonResult Users(string query)
        {
            return GetJson(_SL.Search.UsersByString(query));
        }

        public JsonResult Any(string query)
        {
            return GetJson(_SL.Search.Any(query));
        }
    }
}