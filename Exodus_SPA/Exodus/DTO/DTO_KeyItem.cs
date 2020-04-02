using Exodus.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;

namespace Exodus.DTO
{
    public class DTO_KeyItem
    {
        #region Fields

        public bool Enable { get; set; } = true; // Is Enable
        public string Model { get; set; } // Model Type Name
        public string PropertyName { get; set; } // Property in Model
        public string ModelName { get; set; }    //
        public string Name { get; set; }
        //s
        private object _Value = null;
        public object Value
        {
            get { return _Value; }
            set
            {
                if (value is String && CheckValueType(value as string))
                {
                    ValueString = value as string;
                    switch (Type)
                    {
                        case EN_KeyType.DateTime: ValueType = typeof(DateTime); _Value = DateTime.Parse(ValueString); break;
                        case EN_KeyType.Number: ValueType = typeof(long); _Value = long.Parse(ValueString); break;
                        case EN_KeyType.Text: ValueType = typeof(string); _Value = value; break;
                        case EN_KeyType.Money: ValueType = typeof(decimal); _Value = decimal.Parse(ValueString); break;
                        case EN_KeyType.None: _Value = null; break;
                        default: _Value = null; break;
                    }
                }
            }
        }
        private string _ValueString = "";
        public string ValueString
        {
            get
            {
                if (!String.IsNullOrEmpty(Pattern))
                {
                    switch (Type)
                    {
                        case EN_KeyType.DateTime: return ((DateTime)Value).ToString(Pattern);
                        case EN_KeyType.Number: return ((long)Value).ToString();
                        case EN_KeyType.Money: return ((decimal)Value).ToString();
                        default: return Value.ToString();
                    }

                }
                else { return _ValueString; }
            }
            set
            {
                _ValueString = value ?? "";
            }
        }
        private string _Type { get; set; }
        public EN_KeyType Type
        {
            get
            {
                switch (_Type.ToLower().Trim())
                {
                    case "datetime": case "dt": return EN_KeyType.DateTime;
                    case "num": case "number": return EN_KeyType.Number;
                    case "txt": case "text": return EN_KeyType.Text;
                    case "money": return EN_KeyType.Money;
                    default: return EN_KeyType.None;
                }
            }
        }
        public string Pattern { get; set; } = "";
        public EN_ModelType ModelType { get; set; }
        public Type ValueType { get; set; } = null;
        public bool HasValue { get; set; } = false;
        public bool isChecked { get; set; } = false;
        public bool SingleRelation { get; set; } = true;
        private String _RelationType { get; set; } = "";
        public EN_RelationType RelationType
        {
            get
            {
                switch(_RelationType.ToLower())
                {
                    case "user": return EN_RelationType.User;
                    case "tag": return EN_RelationType.Tag;
                    default: return EN_RelationType.None;
                }    
            }
        }   
        public bool HasModel { get { return !String.IsNullOrEmpty(Model); } }
        public bool HasModelName { get { return !String.IsNullOrEmpty(ModelName); } }

        #endregion

        public DTO_KeyItem(XmlElement elem)
        {
            if (!String.IsNullOrEmpty(elem.GetAttribute("enable")))
            { Enable = elem.GetAttribute("enable").ToLower() == "true" ? true : false; } // is enable
            Name = elem.GetAttribute("name");                                               // front name value
            _Type = elem.GetAttribute("type");                                              // type
            Model = elem.GetAttribute("model");                                             // backend model
            PropertyName = elem.GetAttribute("propertyname");                               // backend property name
            ModelName = elem.GetAttribute("modelname");                                     // model name
            // Relations
            if (!String.IsNullOrEmpty(elem.GetAttribute("relation")))
            { SingleRelation = elem.GetAttribute("relation").ToLower() == "single" ? true : false; }
            // RelationType
            _RelationType = elem.GetAttribute("relationtype");
            //
            Pattern = elem.GetAttribute("pattern");
            //
            ModelType = elem.GetAttribute("modeltype").Trim() == "class" ? EN_ModelType.Class : EN_ModelType.Field;
        }

        private bool CheckValueType(string value)
        {
            // params
            DateTime _dt = new DateTime();
            long _long = 0;
            decimal _decimal = 0;
            // check
            switch (Type)
            {
                case EN_KeyType.DateTime: isChecked = DateTime.TryParse(value, out _dt); break;
                case EN_KeyType.Number: isChecked = long.TryParse(value, out _long); break;
                case EN_KeyType.Text: isChecked = !String.IsNullOrEmpty(value); break;
                case EN_KeyType.Money: isChecked = decimal.TryParse(value, out _decimal); break;
                case EN_KeyType.None: isChecked = false; break;
            }
            // get rezult
            return isChecked;
        }
    }
}