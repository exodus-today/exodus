using Exodus.API.Helpers;
using Exodus.Domain;
using Exodus.DTO;
using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.Helpers;
using Exodus.Service;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Exodus.Security.Security;
using static Exodus.Service._SL;
using Exodus.Models;

namespace Exodus.Controllers
{
    public class UserController : BaseController
    {
        // Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            return (IsUserLogIn) ? RedirectTo("Index", "Desktop") : View();
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Login(UserLoginDTO userLogin)
        {
            if (!Global.Cache.CheckEmailExists(userLogin.UserName))
            { return GetJson(EN_ErrorCodes.IncorrectLogin); }
            //
            UserLoginDetails UserLoginDetails = _DL.User.Account.LoginDetails_ByEmail(userLogin.UserName);
            //
            if (HashHMACSHA1.CheckSaltedHash(userLogin.Password, UserLoginDetails.PasswordHash))
            {
                var user = _DL.User.Get.ByID(UserLoginDetails.UserID);
                // Set User
                CurrentUser = user;
                // Set Log In
                Global.Cache.SetLogIn(user.UserID);
                //
                return GetJson(new
                {
                    FirstName = user.UserFirstName,
                    LastName = user.UserLastName,
                    UserID = user.UserID,
                    AvatarSmall = user.AvatarSmall,
                    AvatarBig = user.AvatarBig
                });
            }
            else
            {
                return GetJson(EN_ErrorCodes.IncorrectPassword);
            }
        }

        [AllowAnonymous]
        public ActionResult LogOff()
        {
            ClearSession();
            return RedirectToAction("Login", "User");
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult RegisterByMyself()
        {
            return(IsUserLogIn) ? RedirectTo("Index", "Desktop") : View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult LoginByFacebook(UserLoginByFacebookDTO userLoginDTO)
        {
            if (IsUserLogIn) { return RedirectToAction("Index", "Desktop"); }
            if (!userLoginDTO.Validate())
            {
                return RedirectToAction("Registration", "Errors");
            }
            // get user
            var user = _DL.User.Get.ByExternalID(userLoginDTO.ExternalID, EN_RegistrationSource.Facebook);
            // login
            if (user != null)
            {
                CurrentUser = user;
                return RedirectToAction("Index", "Desktop");
            }
            // register
            else
            {
                VM_UserRegister regUser = userLoginDTO.TO_VM();
                regUser.InvitedBy = _DL.User.Get.SystemUser();
                regUser.UserLoginDetails = new Security.Salted_Hash();
                var userNew = _DL.User.Account.Register(regUser);
                CurrentUser = _DL.User.Get.ByID(userNew.UserID);
                // Get avatars
                System.Net.WebClient client = new System.Net.WebClient();
                Stream avatatLarge = client.OpenRead(userLoginDTO.PictureLarge);
                // replace avatars
                AvatarGenerator.Generate(avatatLarge, CurrentUser.UserID);
                return RedirectToAction("Index", "Desktop");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Register(UserRegister_DTO userRigisterDTO)
        {
            if (!userRigisterDTO.Validate()) { return RedirectToAction("Registration", "Errors"); }
            // Test User Exist
            if (Global.Cache.CheckEmailExists(userRigisterDTO.Email))
            { return RedirectToAction("UserAlreadyExist", "Errors"); }
            // user registration
            var user = userRigisterDTO.ViewModel;
            //
            user.UserLoginDetails = HashHMACSHA1.CreateSaltedHash(userRigisterDTO.Password, 10);
            var userNew = _DL.User.Account.Register(user);
            // Add to session
            CurrentUser = _DL.User.Get.ByID(user.UserID);
            return RedirectToAction("Index", "Desktop");
        }

        [AllowAnonymous]
        public ActionResult Register(string InviteCode)
        {
            if (IsUserLogIn) { return RedirectToAction("Index", "Desktop"); }
            //
            var InvitedUser = _DL.User.Get.ByGuid(InviteCode);
            // If Exists
            return (InvitedUser == null) ? RedirectTo("IncorrectInviteCode", "Errors") : View(new VM_UserRegister { InvitedBy = InvitedUser });
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            // Get Users 
            List<VM_User> users = _DL.User.Get.All();
            // Create Data
            return GetJson(users);
        }

        [AllowAnonymous]
        public ActionResult ChangePassword()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult ResetPassword()
        {
            return View();
        }

      
    }
}