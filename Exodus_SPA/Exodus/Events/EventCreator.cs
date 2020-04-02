using Exodus.Domain;
using Exodus.Enums;
using Exodus.Exceptions;
using Exodus.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Events
{
    public static class EventCreator
    {
        // EventTypeID = 1
        // EventTemplates\1_Tag_Join_Invitation.xml
        public static long TagJoinInvitation(long TagID, long InvitedUserID, long InviterUserID, int ApplicationID)
        {
            // Check ID
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(TagID); }
            if (!Global.Cache.CheckUserExists(InvitedUserID, InviterUserID)) { throw new UserNotFoundException(InvitedUserID, InviterUserID); }
            if (!Global.Cache.dicApplications.ContainsKey((EN_ApplicationType)ApplicationID)) { throw new ApplicationNotFoundException(); }
            // Create Dictionary
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add(nameof(TagID), TagID.ToString());
            dic.Add(nameof(InvitedUserID), InvitedUserID.ToString());
            dic.Add(nameof(InviterUserID), InviterUserID.ToString());
            dic.Add(nameof(ApplicationID), ApplicationID.ToString());
            // Create Event
            var _event = new EventModel(dic, EN_EventType.Tag_Join_Invitation);
            // Get EventID
            return _event.EventID;
        }

        // EventTypeID = 2 
        // EventTemplates\2_User_Has_Joined_Tag_Upon_Your_Invitation.xml
        public static long UserHasJoinedTagUponYourInvitation(long TagID, long InvitedUserID, long InviterUserID, int ApplicationID)
        {
            // Check ID
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(TagID); }
            if (!Global.Cache.CheckUserExists(InvitedUserID, InviterUserID)) { throw new UserNotFoundException(InvitedUserID, InviterUserID); }
            if (!Global.Cache.dicApplications.ContainsKey((EN_ApplicationType)ApplicationID)) { throw new ApplicationNotFoundException(); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add(nameof(TagID), TagID.ToString());
            dic.Add(nameof(InvitedUserID), InvitedUserID.ToString());
            dic.Add(nameof(InviterUserID), InviterUserID.ToString());
            dic.Add(nameof(ApplicationID), ApplicationID.ToString());
            // Create Event
            var _event = new EventModel(dic, EN_EventType.User_Has_Joined_Tag_Upon_Your_Invitation);
            // Get EventID
            return _event.EventID;
        }

        // EventTypeID = 3 
        // EventTemplates\3_User_Has_Left_Tag.xml
        public static long UserHasLeftTag(long TagID, long UserID, int ApplicationID)
        {
            // Check ID
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(TagID); }
            if (!Global.Cache.CheckUserExists(UserID)) { throw new UserNotFoundException(UserID); }
            if (!Global.Cache.dicApplications.ContainsKey((EN_ApplicationType)ApplicationID)) { throw new ApplicationNotFoundException(); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add(nameof(TagID), TagID.ToString());
            dic.Add(nameof(UserID), UserID.ToString());
            dic.Add(nameof(ApplicationID), ApplicationID.ToString());
            // Create Event
            var _event = new EventModel(dic, EN_EventType.User_Has_Left_Tag);
            // Get EventID
            return _event.EventID;
        }

        // EventTypeID = 5
        // EventTemplates\5_New_Transaction_Received_Confirmation_Required.xml
        public static long NewTransactionReceivedConfirmationRequired(long SenderID, long ReceiverID, long TransactionID)
        {
            // Check ID
            if (!Global.Cache.CheckUserExists(SenderID, ReceiverID)) { throw new UserNotFoundException(SenderID, ReceiverID); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add(nameof(SenderID), SenderID.ToString());
            dic.Add(nameof(ReceiverID), ReceiverID.ToString());
            dic.Add(nameof(TransactionID), TransactionID.ToString());
            // Create Event
            var _event = new EventModel(dic, EN_EventType.New_Transaction_Received_Confirmation_Required);
            // Get EventID
            return _event.EventID;
        }

        // EventTypeID = 6
        // EventTemplates\6_Transaction_Was_Confirmed_By_Receiver.xml
        public static long TransactionWasConfirmedByReceiver(long SenderID, long ReceiverID, long TransactionID)
        {
            // Check ID
            if (!Global.Cache.CheckUserExists(SenderID, ReceiverID)) { throw new UserNotFoundException(SenderID, ReceiverID); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add(nameof(SenderID), SenderID.ToString());
            dic.Add(nameof(ReceiverID), ReceiverID.ToString());
            dic.Add(nameof(TransactionID), TransactionID.ToString());
            // Create Event
            var _event = new EventModel(dic, EN_EventType.Transaction_Was_Confirmed_By_Receiver);
            // Get EventID
            return _event.EventID;
        }

        // EventTypeID = 7, 8, ,9
        // EventTemplates\7_User_Status_Became_Red.xml
        // EventTemplates\8_User_Status_Became_Green.xml
        // EventTemplates\9_User_Status_Became_Yellow.xml
        public static long UserStatusChange(long UserID, En_CurrentStatus UserStatusID)
        {
            // Check ID
            if (!Global.Cache.CheckUserExists(UserID)) { throw new UserNotFoundException(UserID); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add(nameof(UserID), UserID.ToString());
            dic.Add(nameof(UserStatusID), UserStatusID.ToInt().ToString());
            // Create Event
            EventModel _eventModel = null;
            switch (UserStatusID)
            {
                case En_CurrentStatus.I_AM_OK: _eventModel = new EventModel(dic, EN_EventType.User_Status_Became_Green); break;
                case En_CurrentStatus.I_AM_PARTIALLY_OK: _eventModel = new EventModel(dic, EN_EventType.User_Status_Became_Yellow); break;
                case En_CurrentStatus.I_NEED_HELP: _eventModel = new EventModel(dic, EN_EventType.User_Status_Became_Red); break;
            }
            // Get EventID
            return _eventModel.EventID;
        }

        // EventTypeID = 10
        // EventTemplates\10_Obligation_execution_requested.xml
        public static long ObligationExecutionRequested(long ObligationID)
        {
            var obligation = _DL.Obligation.Get.ByID(ObligationID);
            if (obligation == null) { throw new ObligationNotFoundException(ObligationID); }
            // Add Event
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IssuerID", obligation.ObligationIssuer.UserID.ToString());
            dic.Add("HolderID", obligation.ObligationHolder.UserID.ToString());
            dic.Add("ObligationID", obligation.ObligationID.ToString());
            dic.Add("TagID", obligation.ObligationTag.TagID.ToString());
            //
            var _event = new EventModel(dic, EN_EventType.Obligation_Execution_Requested);
            //
            return _event.EventID;
        }

        // EventTypeID = 11
        // EventTemplates\11_Intention_To_Obligation_Convertion_Requested.xml
        public static long IntentionToObligationConvertionRequested(long ObligationID, long IntentionID)
        {
            var obligation = _DL.Obligation.Get.ByID(ObligationID);
            if (obligation == null) { throw new ObligationNotFoundException(ObligationID); }
            //
            var intention = _DL.Intention.Get.ByID(IntentionID);
            if (intention == null) { throw new IntentionNotFoundException(IntentionID); }
            // Add Event
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("IssuerID", obligation.ObligationIssuer.UserID.ToString());
            dic.Add("HolderID", obligation.ObligationHolder.UserID.ToString());
            dic.Add("ObligationID", obligation.ObligationID.ToString());
            dic.Add("TagID", obligation.ObligationTag.TagID.ToString());
            dic.Add("IntentionID", IntentionID.ToString());
            //
            var _event = new EventModel(dic, EN_EventType.Intention_To_Obligation_Convertion_Requested);
            //
            return _event.EventID;
        }

        // EventTypeID = 12
        // EventTemplates\12_User_Reported_Key_Tag_Related_Event.xml
        public static long UserReportedKeyTagRelatedEvent(long ReportedUserID, long TagID)
        {
            // Check ID
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(TagID); }
            if (!Global.Cache.CheckUserExists(ReportedUserID)) { throw new UserNotFoundException(ReportedUserID); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("TagID", TagID.ToString());
            dic.Add("ReportedUserID", ReportedUserID.ToString());
            // Create Event
            var _event = new EventModel(dic, EN_EventType.User_Reported_Key_Tag_Related_Event);
            // Get EventID
            return _event.EventID;
        }

        // EventTypeID = 13
        // EventTemplates\13_Own_Initiative_Tag_Reached_Target_Amount_Including_Intentions.xml
        public static long OwnInitiativeTagReachedTargetAmountIncludingIntentions(long TagID)
        {
            // Check ID
            if (!Global.Cache.CheckTagExists(TagID)) { throw new TagNotFoundException(TagID); }
            // Create Dictionary
            Dictionary<string, string> dic = new Dictionary<string, string>();
            // Add Keys
            dic.Add("TagID", TagID.ToString());
            // Create new event
            var _event = new EventModel(dic, EN_EventType.Own_Initiative_Tag_Reached_Target_Amount_Including_Intentions);
            // Get EventID
            return _event.EventID;
        }
    }
}