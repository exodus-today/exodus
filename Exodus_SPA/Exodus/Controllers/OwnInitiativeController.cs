using Exodus.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.ViewModels;
using Exodus.Exceptions;
using Exodus.ControllerAttribute;
using Exodus.Enums;

namespace Exodus.Controllers
{
    [Compress]
    public class OwnInitiativeController : BaseController
    {
        public PartialViewResult Settings(long TagID)
        {
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            return PartialView("~/Views/OwnInitiative/Settings.cshtml", tag);
        }

        public PartialViewResult Dashboard(long TagID, EN_TagRole TagRole)
        {
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            return PartialView("~/Views/OwnInitiative/Dashboard.cshtml", new Tuple<VM_Tag, EN_TagRole>(tag, TagRole));
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

        public PartialViewResult AppInfo(long TagID)
        {
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            return PartialView(tag);
        }

        public PartialViewResult InviteMembers(long TagID)
        {
            var tag = _DL.Tag.Get.ByID(TagID);
            return PartialView(tag);
        }
    }
}