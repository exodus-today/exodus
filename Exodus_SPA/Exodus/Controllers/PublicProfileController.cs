using Exodus.Domain;
using Exodus.Exceptions;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class PublicProfileController : BaseController
    {
        public PartialViewResult UserDetail(long UserID, long TagID = 0)
        {
            var user = _DL.User.Get.ByID(UserID);
            if (user == null) { throw new UserNotFoundException(); }
            var tag = TagID == 0 ? null : _DL.Tag.Get.ByID(TagID);
            return PartialView(new Tuple<VM_Tag, VM_User>(tag, user));
        }

        public PartialViewResult UserStatus(long UserID)
        {
            var user = _DL.User.Get.ByID(UserID);
            if (user == null) { throw new UserNotFoundException(); }
            return PartialView(user);
        }
    }
}