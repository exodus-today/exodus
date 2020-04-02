using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.Enums;
using Exodus.Domain;
using Exodus.ViewModels;
using Exodus.Service;

namespace Exodus.Controllers
{
    public class TransactionController : BaseController
    {
        [HttpGet]
        public PartialViewResult TransactionList(long TagID = 0, long UserID = 0)
        {
            throw new NotImplementedException();
        }
    }
}