using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;

namespace Exodus.Extensions
{
    public static class XmlDocumentExtension
    {
        public static XmlDocument FromString(this XmlDocument value, string content)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(content);
            return doc;
        }
    }
}