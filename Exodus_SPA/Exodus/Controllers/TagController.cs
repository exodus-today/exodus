using Exodus.Domain;
using Exodus.DTO;
using Exodus.Enums;
using Exodus.Events;
using Exodus.Exceptions;
using Exodus.Helpers;
using Exodus.Models;
using Exodus.Service;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static Exodus.Security.Security;

namespace Exodus.Controllers
{
    public class TagController : BaseController
    {
        #region ACTIONS

        [HttpPost]
        public JsonResult Add(VM_Tag tag)
        {
            // check names
            if (String.IsNullOrEmpty(tag.Name))
            { return GetJson(EN_ErrorCodes.TagNameIsEmpty);}
            // access type
            if (tag.AccessType == EN_TagAccessType.None)
            { return GetJson(EN_ErrorCodes.TagAccessTypeIsNone); }     
            // tag type
            if (tag.Type == EN_TagType.None)
            { return GetJson(EN_ErrorCodes.TagTypeIsNone); }
            if (tag.EndDate < DateTime.Now)
            { return GetJson(EN_ErrorCodes.EndDateNotValid); }
            // Create
            tag.Owner_UserID = CurrentUser.UserID;
            if (tag.DefaultIntentionOwner == null) { tag.DefaultIntentionOwner = CurrentUser; }
            if (tag.ApplicationType == EN_ApplicationType.H20) { tag.TotalAmount = 0; }
            if (tag.ApplicationType == EN_ApplicationType.Own_Initiative && tag.TotalAmount < tag.MinIntentionAmount)
            { return GetJson("Total Amount Less Then MinIntention", EN_ErrorCodes.TagException); }
            //
            var returnVal = _DL.Tag.Add.AddTag(tag);
            // return
            return GetJson(new { TagID = returnVal });
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Join(VM_TagJoinDetails tagJoinDetails)
        {
            // User
            var user = _DL.User.Get.ByID(tagJoinDetails.UserID);
            if (user == null) { return RedirectToAction("UserNotFound", "Errors"); }
            // Tag
            var tag = _DL.Tag.Get.ByID(tagJoinDetails.TagID);
            if (tag == null) { return RedirectToAction("TagNotFound", "Errors"); }
            // If Exists
            if (_DL.Tag.Get.ByUserID(CurrentUser.UserID).Where(a => a.TagID == tagJoinDetails.TagID).Count() != 0 || user.UserID == CurrentUser.UserID)
            {
                return RedirectToAction("TagCanNotAddYourSelf", "Errors", 
                new
                {
                    backurl = this.Url.Action("OpenTag", "Desktop", new { TagID = tagJoinDetails.TagID })
                });
            }
            else
            { 
                //
                VM_Intention intention = new VM_Intention()
                {
                    CurrencyID = tagJoinDetails.IntentionCurrencyID,
                    IntentionAmount = tagJoinDetails.IntentionAmount,
                    ObligationType = new VM_ObligationType { ObligationTypeID = EN_ObligationType.Money },
                    ObligationKind = _DL.Obligation.Get.KindDefault_ByAppID(tag.ApplicationID),
                    Period = tagJoinDetails.Period,
                    IntentionTerm = tagJoinDetails.IntentionTerm,
                    IntentionIssuer = CurrentUser,
                    IntentionHolder = user,
                    IntentionTag = tag,
                    IntentionApplication = new VM_Application { ApplicationID = tag.ApplicationID },
                    IntentionDurationMonths = 0,
                    IntentionStartDate = DateTime.Now,
                    IntentionEndDate = tag.EndDate,
                    IntentionIsActive = true,
                    IntentionDayOfMonth = tag.DayOfMonth,
                    IntentionDayOfWeek = tag.DayOfWeek,
                    
                };
                //
                long rezIntention = _DL.Intention.Add.Intention(intention);
                long rezAdd = _DL.Tag.Add.AddUserAsMember(tag.TagID, CurrentUser.UserID);
                //
                decimal totalSum = _DL.Intention.Get.Intention_Sum_ByTagID(tag.TagID);
                // If total amount bigger then tag amount
                if (totalSum >= tag.TotalAmount && tag.ApplicationType == EN_ApplicationType.Own_Initiative)
                {
                    Dictionary<string, string> dic = new Dictionary<string, string>();
                    EN_EventType type = EN_EventType.Own_Initiative_Tag_Reached_Target_Amount_Including_Intentions;
                    // Add Keys
                    dic.Add("TagID", tag.TagID.ToString());
                    // Create new event
                    new EventModel(dic, type);
                }
                //
                if (_DL.Events.Get.ByID(tagJoinDetails.EventID) != null)
                {
                    // Set Event Read
                    _DL.Events.Update.MarkETU_Processed(CurrentUser.UserID, tagJoinDetails.EventID);
                }
                //
                EventCreator.UserHasJoinedTagUponYourInvitation(tag.TagID, CurrentUser.UserID, tagJoinDetails.UserID, tag.ApplicationID);
                //
                return RedirectToAction("Index", "Desktop", new { TagID = tag.TagID }); 
            }
        }
     
        [HttpGet]
        [AllowAnonymous]
        public ActionResult JoinToTag(long UserID, long TagID, long EventID = 0)
        {
            // User
            var user = _DL.User.Get.ByID(UserID);
            if (user == null) { return RedirectToAction("UserNotFound", "Errors"); }
            // Tag
            var tag = _DL.Tag.Get.ByID(TagID);
            if (tag == null) { return RedirectToAction("TagNotFound", "Errors"); }
            // Check user
            if (UserID == CurrentUser.UserID || _DL.Tag.Get.ByUserID(CurrentUser.UserID).Where(a => a.TagID == TagID).Count() != 0)
            {
                return RedirectToAction("TagCanNotAddYourSelf", "Errors", new
                { backurl = this.Url.Action("OpenTag", "Desktop", new { TagID }) });
            }
            //
            if (String.IsNullOrEmpty(CurrentUser.UserGuid))
            {
                return View("JoinToTagUnAuthorized", new Tuple<VM_User, VM_Tag>(user, tag));
            }
            else
            {
                return View(new Tuple<VM_User, VM_Tag, long>(user, tag, EventID));
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult LoginAndJoin(TagLoginAndJoinDTO model)
        {
            // Tag
            if (_DL.Tag.Get.ByID(model.TagID) == null) { return RedirectToAction("TagNotFound", "Errors"); }
            // User
            if (_DL.User.Get.ByID(model.UserID) == null) { return RedirectToAction("UserNotFound", "Errors"); }
            // Login Details
            var UserLoginDetails = _DL.User.Account.LoginDetails_ByEmail(model.Login);
            if (UserLoginDetails == null) { return RedirectToAction("UserNotFound", "Errors"); }
            // login And Join
            if (ModelState.IsValid && UserLoginDetails.UserID >= 0)
            {
                if (HashHMACSHA1.CheckSaltedHash(model.Password, UserLoginDetails.PasswordHash))
                {
                    CurrentUser = _DL.User.Get.ByID(UserLoginDetails.UserID);
                    return RedirectToAction("JoinToTag", "Tag", new { model.UserID, model.TagID });
                }
            }
            return RedirectToAction("IncorrectLogin", "Errors");       
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult RegisterAndJoin(TagRegisterAndJoinDTO model)
        {
            // Tag
            if (_DL.Tag.Get.ByID(model.TagID) == null) { return RedirectToAction("TagNotFound", "Errors"); }
            // User
            if (_DL.User.Get.ByID(model.UserID) == null) { return RedirectToAction("UserNotFound", "Errors"); }
            // Get Model
            var user = model.TO_VM();
            // Test User Exist
            if (_DL.User.Account.CheckExistence_ByEmail(user.UserEmail))  { return RedirectToAction("UserAlreadyExist", "Errors"); }
            // Validate
            if (!model.Validate()) { throw new RegistrationException(); }
            user.UserLoginDetails = HashHMACSHA1.CreateSaltedHash(user.UserPassword, 10);
            var userNew = _DL.User.Account.Register(user);
            // Add to session
            CurrentUser = _DL.User.Get.ByID(user.UserID);
            return RedirectToAction("JoinToTag", "Tag", new { model.UserID, model.TagID });     
        }

        [HttpGet]
        public ActionResult ApplicationsByTag(string tagId)
        {
            return View();
        }

        #endregion

        #region Partial

        [HttpGet]
        public PartialViewResult View_UserByTag(long TagID)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }
            List<VM_TagUser> users = _DL.Tag.Get.UsersByTag(TagID);
            return PartialView($"~/Views/Partial/Tag/UserList.cshtml", users);
        }

        [HttpGet]
        public PartialViewResult View_UserDetail()
        {
            return PartialView($"~/Views/Partial/Tag/UserDetail.cshtml");
        }

        [HttpGet]
        public PartialViewResult View_AddTagR()
        {
            return PartialView($"~/Views/Partial/Tag/AddTagR.cshtml", CurrentUser);
        }

        [HttpGet]
        public PartialViewResult View_TagList()
        {
            List<VM_Tag> tagList = new List<VM_Tag>();
            return PartialView($"~/Views/Partial/Tag/TagList.cshtml", tagList);
        }

        [HttpGet]
        public PartialViewResult TagDetail(long TagID)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            tag.DefaultIntentionOwner = _DL.User.Get.ByID(tag.DefaultIntentionOwner.UserID);
            return PartialView(tag);
        }

        [HttpGet]
        public PartialViewResult TagInfo(long TagID, bool? AllowCopyLink = true)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }
            VM_Tag tag = _DL.Tag.Get.ByID(TagID);
            return PartialView($"~/Views/Partial/Tag/TagInfo.cshtml", new Tuple<VM_Tag, bool?>(tag, AllowCopyLink));
        }


        [HttpGet]
        public PartialViewResult AppList(long TagID)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }
            List<VM_Application> TagAppList = _DL.Application.Get.All();
            Tuple<long, List<VM_Application>> tuple = new Tuple<long, List<VM_Application>>(TagID, TagAppList);
            return PartialView(tuple);
        }

        [HttpGet]
        public PartialViewResult AppDetail(int ApplicationID, long TagID)
        {
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(); }
            if (!Global.Cache.dicApplications.ContainsKey((EN_ApplicationType)ApplicationID)) { throw new TagNotFoundException(); }
            //
            VM_Application TagApp = _DL.Application.Get.ByID(ApplicationID);
            Tuple<long, VM_Application> tuple = new Tuple<long, VM_Application>(TagID, TagApp);
            return PartialView(tuple);
        }
        #endregion
    }
}