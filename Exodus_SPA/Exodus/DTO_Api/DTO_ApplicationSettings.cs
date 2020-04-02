using Exodus.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace Exodus.DTO_Api
{
    public class DTO_ApplicationSettings
    {
        public DTO_ApplicationSettings() { }
        public long SettingsID { get; set; } = 0;
        public long TagID { get; set; } = 0;
        public int ApplicationID { get; set; } = 0;
        [JsonIgnore]
        public XmlDocument XmlSettings  { get; set; } = new XmlDocument();
        [JsonIgnore]
        public string Settings // generate
        {
            get
            {
                string xml = Helpers.FileHelper.AsString("AppXML", "app_settings.xml");
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml);
                //Intention_Type
                var element = doc.CreateElement("setting");
                //
                element.SetAttribute("name", "Intention_Type");
                element.SetAttribute("value", Intention_Type.ToString());
                doc.DocumentElement.AppendChild(element);
                //
                return doc.OuterXml.Replace("\"utf-8\"", "\"utf-16\"");
            }
        }
        public EN_App_Intention_Type Intention_Type { get; set; } = EN_App_Intention_Type.Regular;
        public void ReadFromXml(string xml)
        {
            XmlSettings.LoadXml(xml.Replace("\"utf-16\"", "\"utf-8\""));
            //
            var listAppSettings = XmlSettings.DocumentElement.SelectNodes("setting").Cast<XmlNode>().Select(a => new
            {
                name = a.Attributes["name"].Value,
                value = a.Attributes["value"].Value
            });
            // Get Type
            Intention_Type = (EN_App_Intention_Type)Enum.Parse(typeof(EN_App_Intention_Type), listAppSettings.Where(a => a.name == "Intention_Type").First().value);
        }
    }
}