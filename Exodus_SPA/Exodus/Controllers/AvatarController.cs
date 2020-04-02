using Exodus.Domain;
using Exodus.Enums;
using Exodus.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exodus.Controllers
{
    public class AvatarController : BaseController
    {
        [HttpPost]
        public JsonResult Upload(HttpPostedFileBase avatar)
        {
            if (avatar != null)
            {
                switch (Path.GetExtension(avatar.FileName).ToLower())
                {
                    case ".jpg": case ".png": case ".jpeg": case ".gif":  case ".tiff":
                             return GetJson(AvatarGenerator.Generate(avatar.InputStream, CurrentUser.UserID));
                    default: return GetJson(EN_ErrorCodes.IncorrectFileType);
                }
            }
            else
            {
                return GetJson(EN_ErrorCodes.NoData);
            }
        }
    }
}