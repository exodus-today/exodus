using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Serialization;
using Exodus.Domain;
using Exodus.Enums;

namespace Exodus.Models
{
    public class CheckObject
    {
        public CheckObject() { }

        public CheckObject(long ID, EN_CheckObjectType Type)
        {
            this.EnType = Type;
            this.ID = ID;
            this.Type = Type.ToString();
        }

        public long ID { get; set; }
        public string Type { get; set; }
        public EN_CheckObjectType EnType { get; set; }
        public bool Exists { get; set; }

        public T GetObject<T>() where T : class
        {
            if (!Exists) { return null; }
            else
            {
                switch (EnType)
                {
                    case EN_CheckObjectType.Bank: return null;
                    case EN_CheckObjectType.Event: return _DL.Events.Get.ByID(ID) as T;
                    case EN_CheckObjectType.Intention: return _DL.Intention.Get.ByID(ID) as T;
                    case EN_CheckObjectType.Obligation: return _DL.PaymentAccount.Get.ByID((int)ID) as T;
                    case EN_CheckObjectType.Tag: return _DL.Tag.Get.ByID(ID) as T;
                    case EN_CheckObjectType.Transaction: return _DL.Transactions.Get.ByID(ID) as T;
                    case EN_CheckObjectType.User: return _DL.User.Get.ByID(ID) as T;
                    default: return null;
                }
            }
        }
    }
}