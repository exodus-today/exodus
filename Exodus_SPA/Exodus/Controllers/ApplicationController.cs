using Exodus.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Exodus.Service;
using Exodus.ViewModels;
using Exodus.Enums;
using Exodus.Exceptions;

namespace Exodus.Controllers
{
    public class ApplicationController : BaseController
    {
        public PartialViewResult AppH2O(long TagID)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }
            //
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            //
            EN_TagRole tagRole = EN_TagRole.None;
            long UserID = Global.Global.CurrentUser.UserID;
            if (!Global.Cache.CheckUserExists(UserID)) { throw new UserNotFoundException(); }
            if (tag.Owner_UserID == UserID)
            { tagRole = EN_TagRole.Owner; }
            else if (_DL.Tag.Get.UsersByTag(TagID).Where(a => a.TagUser.UserID == UserID).Count() > 0)
            { tagRole = EN_TagRole.Member; }
            else
            { tagRole = EN_TagRole.None; }

            return PartialView("AppH2O", new Tuple<VM_Tag, EN_TagRole> (tag, tagRole));
        }

        public PartialViewResult AppOwnIniciative(long TagID)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }

            VM_Tag tag = _DL.Tag.Get.ByID(TagID);

            EN_TagRole tagRole = EN_TagRole.None;
            long UserID = Global.Global.CurrentUser.UserID;
            if (!Global.Cache.CheckUserExists(UserID)) { throw new UserNotFoundException(); }
            if (tag.Owner_UserID == UserID)
            { tagRole = EN_TagRole.Owner; }
            else if (_DL.Tag.Get.UsersByTag(TagID).Where(a => a.TagUser.UserID == UserID).Count() > 0)
            { tagRole = EN_TagRole.Member; }
            else
            { tagRole = EN_TagRole.None; }

            return PartialView("AppOwnInitiative", new Tuple<VM_Tag, EN_TagRole>(tag, tagRole));
        }
    }
}