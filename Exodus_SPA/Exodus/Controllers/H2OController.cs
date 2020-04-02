using Exodus.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.ViewModels;
using Exodus.Exceptions;
using Exodus.Enums;
using Exodus.ControllerAttribute;

namespace Exodus.Controllers
{
    [Compress]
    public class H2OController : BaseController
    {
        public PartialViewResult AppDetail(long TagID)
        {
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            if (tag == null) { throw new TagNotFoundException(); }
            return PartialView(tag);
        }
      
        public PartialViewResult UserList(long TagID)
        {
            var users = _DL.Tag.Get.UserByTag_WithStatus(TagID);
            return PartialView(users);
        }

        public PartialViewResult UserDetail(long TagID, long UserID)
        {
            var user = _DL.User.Get.ByID(UserID);
            if (user == null) { throw new UserNotFoundException(); }
            var tag = _DL.Tag.Get.ByID(TagID);
            if (tag == null) { throw new TagNotFoundException(); }

            return PartialView(new Tuple<VM_Tag, VM_User>(tag, user));
        }

        public PartialViewResult UserActions(long TagID, long UserID)
        {
            var user = _DL.User.Get.ByID(UserID);
            if (user == null) { throw new UserNotFoundException(); }
            return PartialView(user);
        }

        public PartialViewResult AppH2ODefaultPage(long TagID, EN_TagRole TagRole)
        {
            var tag = _DL.Tag.Get.ByID(TagID);
            return PartialView("~/Views/Partial/Applications/H2O_Init.cshtml", new Tuple<VM_Tag, EN_TagRole>(tag, TagRole));
        }

        public PartialViewResult InviteMembers(long TagID)
        {
            var tag = _DL.Tag.Get.ByID(TagID);
            return PartialView(tag);
        }

    }
}