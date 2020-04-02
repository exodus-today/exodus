using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using Exodus.Enums;
using Exodus.Extensions;
using Exodus.Helpers;
using System.Text.RegularExpressions;
using Exodus.DTO;
using System.Web.Script.Serialization;
using Exodus.Interfaces;

namespace Exodus.Helpers
{
    public static class EventTemplate
    {
        private const string xmlFolderName = "EventTemplates";

        public static XmlDocument GetFullXml(EN_EventType type)
        {
            // Get name by id
            string fName = FileHelper.GetFileList(xmlFolderName)
                .Where(a => new FileInfo(a).Name.StartsWith($"{type.ToInt()}_")).FirstOrDefault();
            // create Xml
            XmlDocument doc = new XmlDocument();
            doc.Load(fName);
            //
            string content = XmlNodeAttributeToLower(doc.OuterXml);
            //
            doc.LoadXml(content);
            // return
            return doc;
        }

        private static XmlDocument GetXml(EN_EventType type, EN_SubType nodeType)
        {
            XmlDocument doc;
            // get from cache
            if (Global.Cache.dicEventTemplates.ContainsKey(type))
            { doc = Global.Cache.dicEventTemplates[type]; }
            else
            { doc = GetFullXml(type); } // Full document
            //
            var elem = doc.DocumentElement.SelectSingleNode(GetXmlNodeName(nodeType));
            // recreate full
            doc = new XmlDocument();
            // remove comments
            var content = new Regex(" < !--[\\w\\s]*-->|<!---->").Replace(elem.OuterXml, "");
            doc.LoadXml(content);
            // return rezult
            return doc;
        }

        private static string XmlNodeAttributeToLower(string content)
        {
            // get char elems
            char[] charContent = content.ToCharArray();
            // All node names and names to lower
            foreach (Match item in new Regex("<\\w+>|<\\/\\w+>?|<\\w+\\s+|\\w+=\\\"").Matches(content))
            {
                for (int i = 0; i < item.Value.Length; i++)
                {
                    charContent[item.Index + i] = Char.ToLower(item.Value[i]);
                }
            }
            return new string(charContent);
        }

        private static List<DTO_KeyItem> GetKeyList(EN_EventType type, EN_SubType nodeType)
        {
            return GetXml(type, nodeType).DocumentElement       // get main element
               .SelectNodes("//key").Cast<XmlElement>()         // cast
               .Select(a => new DTO_KeyItem(a))                 // get keyItem
               .Where(a => a.Enable).ToList();                  // selecn active
        }

        private static string GetXmlNodeName(EN_SubType nodeType)
        {
            switch(nodeType)
            {
                case EN_SubType.Content: return "content";
                case EN_SubType.Thumbnail: return "thumbnail";
                case EN_SubType.Related: return "related";
                default: return "";
            }
        }

        public static bool HasTemplate(EN_EventType type)
        {
            if (Global.Cache.dicEventTemplates.ContainsKey(type))
            { return true; }
            else
            {
                // Get name by id
                string fName = FileHelper.GetFileList(xmlFolderName)
                    .Where(a => new FileInfo(a).Name.StartsWith($"{type.ToInt()}_")).FirstOrDefault();
                // Has template
                return File.Exists(fName);
            }
        }

        public static List<DTO_KeyItem> CheckContentKeys(Dictionary<string, string> dic, EN_EventType type, out List<string> incorrectKeys)
        {
            List<DTO_KeyItem> keyItems = new List<DTO_KeyItem>();
            // key item
            incorrectKeys = new List<string>();
            //
            foreach (var keyItem in GetKeyList(type, EN_SubType.Content))
            {
                // if not found
                if (!dic.ContainsKey(keyItem.Name))
                { incorrectKeys.Add(keyItem.Name); }
                else
                {
                    keyItem.Value = dic[keyItem.Name]; // Init value
                    // check
                    if (!keyItem.isChecked) { incorrectKeys.Add(keyItem.Name); } else { keyItems.Add(keyItem); }
                }               
            }
            // if zero return true
            return keyItems;
        }

        private static XmlDocument GetXmlNameValue(List<DTO_KeyItem> keyItems, EN_EventType type, EN_SubType nodeType)
        {
            // get content
            XmlDocument doc = GetXml(type, nodeType);
            // fiil document
            foreach (XmlElement item in doc.SelectNodes("//key"))
            {
                // get keyItem
                var keyItem = keyItems.Where(a => a.Name == item.GetAttribute("name")).FirstOrDefault();
                item.SetAttribute("name", keyItem.Name);
                item.SetAttribute("value", keyItem.ValueString);
            }
            // return document
            return doc;
        }

        public static XmlDocument GetContent(List<DTO_KeyItem> keyItems, EN_EventType type)
        {
            return GetXmlNameValue(keyItems, type, EN_SubType.Content);
        }

        public static List<DTO_KeyItem> GetRelated (List<DTO_ModelObject> Models, EN_EventType type)
        {
            var list = GetKeyList(type, EN_SubType.Related);
            //
            for (int i = 0; i < list.Count; i++)
            {
                var model = Models.Where(a => a.Name == list[i].ModelName).FirstOrDefault().Model;
                var value = model.GetType().GetProperty(list[i].PropertyName).GetValue(model);
                list[i].Value = value.ToString();
            }
            //
            return list;
        }

        public static List<DTO_KeyItem> GetKeyItemsThumbnail(EN_EventType type)
        {
            // get content
            XmlDocument doc = GetXml(type, EN_SubType.Thumbnail);
            // fiil document
            return doc.SelectNodes("//key").Cast<XmlElement>().Select(a => new DTO_KeyItem(a)).ToList();
        }

        public static List<DTO_KeyItem> GetKeyItemsContent(EN_EventType type)
        {
            // get content
            XmlDocument doc = GetXml(type, EN_SubType.Content);
            // fiil document
            return doc.SelectNodes("//key").Cast<XmlElement>().Select(a => new DTO_KeyItem(a)).ToList();
        }

        public static XmlDocument GetThumbnail(List<DTO_ModelObject> Models, EN_EventType type)
        {
            // get content
            XmlDocument doc = GetXml(type, EN_SubType.Thumbnail);
            // fiil document
            foreach (XmlElement item in doc.SelectNodes("//key"))
            {
                var keyItem = new DTO_KeyItem(item);
                var model = Models.Where(a => a.Name == keyItem.ModelName).FirstOrDefault().Model;
                //
                if(model.GetType().Name == keyItem.Model)
                {
                    // set name
                    item.SetAttribute("name", keyItem.Name);
                    // get property
                    switch (keyItem.PropertyName.ToLower())
                    {
                        case "avatarsmall": item.SetAttribute("value", $"{model.GetType().GetProperty("UserID").GetValue(model)}"); break;
                        case "avatarbig": item.SetAttribute("value", $"{model.GetType().GetProperty("UserID").GetValue(model)}");   break;
                        default:
                            var value = model.GetType().GetProperty(keyItem.PropertyName).GetValue(model);
                            if (keyItem.ModelType == EN_ModelType.Class)
                            {
                                var dicString = ((IDictionarySerialozation)value).DictionarySerialozation.Select(a => $"\"{a.Key}\":\"{a.Value}\"" );
                                item.SetAttribute("value", String.Join(",", dicString));
                            }
                            else
                            {
                                if (value is decimal) { item.SetAttribute("value", ((decimal)value).ToString("F2").Replace(".", ",")); }
                                else if (value is double) { item.SetAttribute("value", ((double)value).ToString("F2").Replace(".", ",")); }
                                else if (value is float) { item.SetAttribute("value", ((float)value).ToString("F2").Replace(".", ",")); }
                                else { item.SetAttribute("value", value.ToString()); }                               
                            }
                        break;
                    } 
                }
            }
            // return document
            return doc;
        }
    }
}