using Exodus.Domain;
using Exodus.Enums;
using Exodus.Helpers;
using Exodus.Exceptions;
using Exodus.Extensions;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Xml;
using Exodus.DTO;

namespace Exodus.Events
{
    public class EventModel
    {
        public EventModel()
        {

        }

        public EventModel(Dictionary<string, string> dic, EN_EventType Type)
        {
            if (!EventTemplate.HasTemplate(Type)) { throw new ExodusException("Template not found"); }
            //
            Init(Type);
            // check keys
            var keys = CheckKeys(dic);
            // fill model
            FieldModel(keys);
            // Get Content
            Content = EventTemplate.GetContent(keys, Type);
            // Get ThumbNail
            Thumbnail = EventTemplate.GetThumbnail(Models, Type);
            // Add Event
            EventID = _DL.Events.Add.Event(this.Event);
            // Add Relations
            if (this.EventID != -1)
            {
                _DL.Events.Add.EventToUsers(this.EventID, RelatedUsers);
            }
        }

        public static EventModel LoadEventByID(long EventID)
        {
            var _event = _DL.Events.Get.ByID(EventID);
            //
            var _eventModel = new EventModel();
            //
            Dictionary<string, string> dic = _event.Content.DocumentElement.SelectNodes("keys/key").Cast<XmlElement>()
                .ToDictionary(n => n.GetAttribute("name"), n => n.GetAttribute("value") );
            //
            _eventModel.Init(_event.Type.Type);
            // Add ApplicationID
            if(dic.Where(a => a.Key == "ApplicationID").Count() <= 0 && dic.Where(a => a.Key == "TagID").Count() > 0)
            {
                string TagID = dic.Where(a => a.Key == "TagID").Select(a => a.Value).First();
                var tag = _DL.Tag.Get.ByID(long.Parse(TagID ?? "0"));
                if (tag != null) { dic.Add("ApplicationID", tag.ApplicationID.ToString()); }
            }
            //
            var keys = _eventModel.CheckKeys(dic);
            //
            _eventModel.FieldModel(keys);
            //
            _eventModel.Thumbnail = EventTemplate.GetThumbnail(_eventModel.Models, _eventModel.Type);
            //
            _eventModel.Content = EventTemplate.GetContent(keys, _eventModel.Type);
            //
            _eventModel.EventID = EventID;
            //
            return _eventModel;
        }

        public long EventID { get; set; }
        public EN_EventType Type { get; set; }
        public EN_EventCategory Category { get; set; }
        public DateTime Added { get; set; } = DateTime.Now;
        public EN_ImportantLevel ImportantLevel { get; set; }
        // XML fields
        public XmlDocument Content { get; set; }
        public XmlDocument Thumbnail { get; set; }
        // Getters
        public VM_Event Event
        {
            get
            {
                return new VM_Event()
                {
                    Added = Added,
                    Application = GetModel<VM_Application>("Application"),
                    Category = new VM_EventCategory() { ID = Category.ToInt() },
                    ImportanLevel = new VM_ImportanLevel() { ID = ImportantLevel.ToInt() },
                    Tag = GetModel<VM_Tag>("Tag"),
                    Title = "",
                    Type = Global.Cache.dicEventTypes[Type],
                    Content = Content,
                    Thumbnail = Thumbnail
                };
            }
        }

        public List<DTO_ModelObject> Models { get; private set; } = new List<DTO_ModelObject>();
        //
        public List<long> RelatedUsers
        {
            get
            {
                var list = new List<long>();
                foreach (var item in EventTemplate.GetRelated(Models, Type))
                {
                    //
                    if (item.SingleRelation)
                    {
                        list.Add(Convert.ToInt64(item.ValueString));
                    }
                    else
                    {
                        long id = Convert.ToInt64(item.ValueString); //
                        switch (item.RelationType)
                        {
                            case EN_RelationType.User : list.AddRange(_DL.User.Get.RelationsByID(id).Select(a => a.UserID)); break;
                            case EN_RelationType.Tag : list.AddRange(_DL.Tag.Get.UsersByTag(id).Select(a => a.TagUser.UserID)); break;
                        }
                    }
                } 
                //
                return list;
            }
        }

        // Functions
        protected void Init(EN_EventType Type)
        {
            this.Type = Type;
            this.Category = Global.Cache.dicEventTypes[Type].Category;
            this.ImportantLevel = Global.Cache.dicEventTypes[Type].ImportantLevel;
        }
   
        public T GetModel<T>(string name) where T : class
        {
            var model = Models.Where(a => a.Name == name).FirstOrDefault();
            //
            return model == null ? null : (T)model.Model;
        }

        public T GetModel<T>() where T : class
        {
            var model = Models.Where(a => a.Type is T).FirstOrDefault();
            //
            return model == null ? null : (T)model.Model;
        }

        protected object GetModelFromDB(string model, string value)
        {
            switch (model)
            {
                case "VM_User":             return _DL.User.Get.ByID(Convert.ToInt64(value));
                case "VM_Tag":              return _DL.Tag.Get.ByID(Convert.ToInt64(value));
                case "VM_Transaction":      return _DL.Transactions.Get.ByID(Convert.ToInt64(value));
                case "VM_PaymentAccount":   return _DL.PaymentAccount.Get.ByID(Convert.ToInt32(value));
                case "VM_Obligation":       return _DL.Obligation.Get.ByID(Convert.ToInt32(value));
                case "VM_Intention":        return _DL.Intention.Get.ByID(Convert.ToInt32(value));
                case "VM_BankCard":         return _DL.Cards.Get.ByID(Convert.ToInt32(value));
                case "VM_Application":      return _DL.Application.Get.ByID(Convert.ToInt32(value));
                default: return null;
            }
        }

        protected void FieldModel(List<DTO_KeyItem> keyItems)
        {
            foreach (var item in keyItems)
            {
                if (item.HasModel)
                {
                    // Get VM from DB
                    var fromDB = GetModelFromDB(item.Model, item.ValueString);
                    //
                    Models.Add(new DTO_ModelObject(item.ModelName, fromDB));
                }
            }
        }

        protected List<DTO_KeyItem> CheckKeys(Dictionary<string, string> dic)
        {
            List<string> incorrectKeys = new List<string>();
            List<DTO_KeyItem> keys = EventTemplate.CheckContentKeys(dic, Type, out incorrectKeys);
            // If error
            if (incorrectKeys.Count > 0)
            { throw new ApiEventTempleteIncorrectKeys($"Incorrent Keys: " + string.Join(",", incorrectKeys)); }
            else
            { return keys; }
        }
    }
}