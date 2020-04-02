using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Exodus.Configuration
{
    public static class ConfigFile
    {
        #region Variables

        // xml elems
        static XmlDocument doc = new XmlDocument();
        static XmlElement xmlRoot = null;
        static XmlElement xmlGlobal = null;
        static XmlElement xmlNamed = null;
        static XmlElement xmlSections = null;

        // set values
        static string file_name = "application.config";
        static string folder = "config";

        // xml names
        private static readonly string strGlobalRoot = "global_root";
        private static readonly string strNamed = "named";
        private static readonly string strRoot = "root";
        private static readonly string strSections = "sections";
        private static readonly string strConfiguration = "configuration";

        #endregion

        #region Properties

        public static string File_Name
        {
            get { return file_name; }
            set
            {
                if (!Validate_FileName(value)) { throw new Exception("Invalid file name"); }
                if (Path.HasExtension(value) && Path.GetExtension(value) != ".config") { throw new Exception("Invalid extinsion"); }
                else if (!Path.HasExtension(value)) { value = value + ".config"; }
                file_name = value;
            }
        }

        public static string Folder_Name
        {
            get { return folder; }
            set
            {
                if (!Validate_FolderName(value)) { throw new Exception("Invalid file name"); }
                folder = value;
            }
        }

        public static string Full_Path
        {
            get { return new FileInfo(Path.Combine(Folder_Name, File_Name)).FullName; }
        }

        public static string Default_Elem_Name { get; } = "add";

        public static string Default_File_Name { get; } = "application.config";

        public static string Default_Folder_Name { get; } = "config";

        public static List<ConfigSection> Sections
        {
            get
            {
                if (xmlSections == null) { return null; }
                return xmlSections.GetElementsByTagName("*").Cast<XmlElement>().Select(a => new ConfigSection(a)).ToList();
            }
        }

        public static List<ConfigElem> Elems
        {
            get
            {
                if (xmlRoot == null) { return null; }
                return xmlRoot.GetElementsByTagName(Default_Elem_Name).Cast<XmlElement>().Select(a => new ConfigElem(a)).ToList();
            }
        }

        public static List<ConfigElemNamed> ElemsNamed
        {
            get
            {
                if (xmlNamed == null) { return null; }
                return xmlNamed.GetElementsByTagName(Default_Elem_Name).Cast<XmlElement>().Select(a => new ConfigElemNamed(a)).ToList();
            }
        }

        public static List<string> Keys
        {
            get
            {
                if (xmlRoot == null) { throw new Exception("root of file is null"); }
                return xmlRoot.GetElementsByTagName("*").Cast<XmlElement>().Select(a => a.GetAttribute("key")).ToList();
            }
        }

        #endregion

        #region Validation

        public static bool Validate_Path(string path)
        {
            if (String.IsNullOrEmpty(path) || String.IsNullOrWhiteSpace(path)) { return false; }
            else if (Path.GetFileName(path).IndexOfAny(Path.GetInvalidFileNameChars()) != -1) { return false; }
            else if (path.IndexOfAny(Path.GetInvalidPathChars()) != -1) { return false; }
            else { return true; }
        }

        public static bool Validate_FileName(string name)
        {
            if (String.IsNullOrEmpty(name) || String.IsNullOrWhiteSpace(name)) { return false; }
            else if (name.IndexOfAny(Path.GetInvalidFileNameChars()) != -1) { return false; }
            else { return true; }
        }

        public static bool Validate_FolderName(string name)
        {
            if (String.IsNullOrEmpty(name) || String.IsNullOrWhiteSpace(name)) { return false; }
            else if (name.IndexOfAny(Path.GetInvalidPathChars()) != -1) { return false; }
            else { return true; }
        }

        #endregion

        #region Create Or Load

        public static bool Create(string path)
        {
            if (String.IsNullOrEmpty(path))
            { throw new FormatException("path is null or empty"); }
            try
            {
                string fName = Path.GetFileName(path);
                string folderName = Path.GetDirectoryName(path);
                if (String.IsNullOrEmpty(fName)) { File_Name = Default_File_Name; }
                else if (Path.GetExtension(fName) != "config") { throw new Exception("Incorrect Extension"); }
                else { File_Name = fName; }

                if (String.IsNullOrEmpty(folderName)) { Folder_Name = Default_Folder_Name; }
                else { Folder_Name = folderName; }
                if (File.Exists(Full_Path)) { File.Delete(Full_Path); }
                if (!Directory.Exists(Folder_Name)) { Create_Folder(Folder_Name); }

                doc = new XmlDocument();
                //(1) the xml declaration is recommended, but not mandatory
                XmlDeclaration xmlDeclaration = doc.CreateXmlDeclaration("1.0", "UTF-8", null);
                // Create the root element
                doc.InsertBefore(xmlDeclaration, doc.DocumentElement);
                xmlGlobal = new XElement(strGlobalRoot, new XAttribute("id", strGlobalRoot)).ToXmlElement(doc);
                xmlRoot = new XElement(strRoot, new XAttribute("id", strRoot)).ToXmlElement(doc);
                xmlNamed = new XElement(strNamed, new XAttribute("id", strNamed)).ToXmlElement(doc);
                xmlSections = new XElement(strSections, new XAttribute("id", strSections)).ToXmlElement(doc);

                xmlGlobal.AppendChild(new XElement(strConfiguration, new XAttribute("creation_time", DateTime.Now.ToString())).ToXmlElement(doc));
                xmlGlobal.AppendChild(xmlRoot);
                xmlGlobal.AppendChild(xmlNamed);
                xmlGlobal.AppendChild(xmlSections);
                doc.AppendChild(xmlGlobal);
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex)
            {
                xmlSections = xmlNamed = xmlGlobal = xmlRoot = null;
                throw ex;
            }

        }

        private static bool Create_Folder(string path)
        {
            if (!Validate_FolderName(path)) { throw new Exception("Invalid folder path"); }
            try
            {
                string[] path_list = path.Split(new char[] { '\\' }, StringSplitOptions.RemoveEmptyEntries);
                path = "";
                foreach (string p in path_list)
                {
                    path += p;
                    if (!Directory.Exists(path)) { Directory.CreateDirectory(path); }
                    path += '\\';
                }
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool Load(string path)
        {
            if (String.IsNullOrEmpty(path))
            { throw new FormatException("path is null or empty"); }
            else if (!File.Exists(path))
            { throw new FileNotFoundException("File not found", Path.GetFileName(path)); }
            else
            {
                Folder_Name = Path.GetDirectoryName(path);
                File_Name = Path.GetFileName(path);
            }
            try
            {
                doc = new XmlDocument();
                doc.Load(path);
                xmlRoot = doc.DocumentElement.GetElementsByTagName(strRoot).Cast<XmlElement>().FirstOrDefault();
                xmlNamed = doc.DocumentElement.GetElementsByTagName(strNamed).Cast<XmlElement>().FirstOrDefault();
                xmlSections = doc.DocumentElement.GetElementsByTagName(strSections).Cast<XmlElement>().FirstOrDefault();
                xmlGlobal = doc.DocumentElement;

                if (xmlRoot == null || xmlRoot.GetAttribute("id") != strRoot)
                { xmlRoot = null; throw new Exception("Incorrect xml elem " + strRoot + " not found"); ; }
                else if (xmlGlobal == null || xmlGlobal.Name != strGlobalRoot || xmlGlobal.GetAttribute("id") != strGlobalRoot)
                { xmlGlobal = null; throw new Exception("Incorrect xml elem " + strGlobalRoot + " not found"); }
                else if (xmlNamed == null || xmlNamed.GetAttribute("id") != strNamed)
                { xmlNamed = null; throw new Exception("Incorrect xml elem " + strNamed + " not found"); }
                else if (xmlSections == null || xmlSections.GetAttribute("id") != strSections)
                { xmlSections = null; throw new Exception("Incorrect xml elem " + strSections + " not found"); }
                else
                { return true; }
            }
            catch (Exception ex)
            {
                xmlRoot = xmlGlobal = xmlNamed = xmlSections = null;
                throw ex;
            }
        }

        public static bool CreateOrLoad(string path)
        {
            if (!File.Exists(path))
            { return Create(path); }
            else
            { return Load(path); }
        }

        #endregion

        #region Save Delete

        public static bool Save(string path)
        {
            try
            {
                if (!Validate_Path(path)) { throw new FormatException("Invalid path"); }
                if (File.Exists(path)) { File.Delete(path); }
                doc.Save(path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool Save()
        {
            return Save(Full_Path);
        }

        public static bool Remove(string key)
        {
            try
            {
                xmlRoot.GetElementsByTagName(Default_Elem_Name)
                    .Cast<XmlElement>().Where(a => a.GetAttribute("key") == key).ToList()
                    .ForEach(a => a.ParentNode.RemoveChild(a));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool RemoveNamed(string name)
        {
            try
            {
                xmlNamed.GetElementsByTagName(name)
                   .Cast<XmlElement>().ToList()
                   .ForEach(a => a.ParentNode.RemoveChild(a));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool Remove_Section(string name)
        {
            try
            {
                xmlSections.GetElementsByTagName(name).Cast<XmlElement>().ToList()
                    .ForEach(a => a.ParentNode.RemoveChild(a));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        #endregion

        #region Add Zone

        public static bool Add(string key, string value)
        {
            try
            {
                var count = xmlRoot.GetElementsByTagName(Default_Elem_Name).Cast<XmlElement>()
                    .Where(a => a.GetAttribute("key") == key && a.GetAttribute("value") == value).Count();
                if (count != 0) { return false; }
                xmlRoot.AppendChild(new XElement(Default_Elem_Name, new XAttribute("key", key), new XAttribute("value", value)).ToXmlElement(doc));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool Add_Named(string name, string key, string value)
        {
            try
            {
                var count = xmlNamed.GetElementsByTagName(name).Cast<XmlElement>()
                    .Where(a => a.GetAttribute("key") == key && a.GetAttribute("value") == value).Count();
                if (count != 0) { return false; }
                xmlNamed.AppendChild(new XElement(name, new XAttribute("key", key), new XAttribute("value", value)).ToXmlElement(doc));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool Add_Section(string name)
        {
            XmlElement elem = xmlSections.GetElementsByTagName(name).Cast<XmlElement>().FirstOrDefault();
            if (elem != null) { return false; }
            try
            {
                var section = new ConfigSection(xmlSections.AppendChild(new XElement(name).ToXmlElement(doc)) as XmlElement);
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex)
            { throw ex; }
        }

        #endregion

        #region Set Zone

        public static bool Set(string key, string value)
        {
            try
            {
                xmlRoot.GetElementsByTagName(Default_Elem_Name).Cast<XmlElement>().Where(a => a.GetAttribute("key") == key)
                    .ToList().ForEach(a => a.SetAttribute("value", value));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public static bool Set_Named(string name, string key, string value)
        {
            try
            {
                xmlNamed.GetElementsByTagName(name).Cast<XmlElement>().Where(a => a.GetAttribute("key") == key)
                    .ToList().ForEach(a => a.SetAttribute("value", value));
                doc.Save(Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        #endregion

        #region Get Zone

        public static ConfigSection GetSection(string sectionName)
        {
            if (xmlSections == null) { return null; }
            XmlElement section = xmlSections.GetElementsByTagName(sectionName).Cast<XmlElement>().FirstOrDefault();
            if (section == null)
            { return null; }
            else
            { return new ConfigSection(section); }
        }

        public static List<ConfigElemNamed> GetNamed(string name, string key)
        {
            if (xmlNamed == null) { return null; }
            var named = xmlNamed.GetElementsByTagName(name).Cast<XmlElement>().Where(a => a.GetAttribute("key") == key);
            if (named.Count() == 0)
            { return null; }
            else
            { return named.Select(a => new ConfigElemNamed(a)).ToList(); }
        }

        public static List<ConfigElemNamed> GetNamed(string name)
        {
            if (xmlNamed == null) { return null; }
            var named = xmlNamed.GetElementsByTagName(name).Cast<XmlElement>();
            if (named.Count() == 0)
            { return null; }
            else
            { return named.Select(a => new ConfigElemNamed(a)).ToList(); }
        }

        public static ConfigElemNamed GetNamedSingle(string name)
        {
            var elems = GetNamed(name);
            return (elems == null) ? null : elems.FirstOrDefault();
        }

        public static ConfigElemNamed GetNamedSingle(string name, string key)
        {
            var elems = GetNamed(name, key);
            return (elems == null) ? null : elems.FirstOrDefault();
        }

        public static List<ConfigElem> GetValues(string key)
        {
            if (xmlRoot == null) { return null; }
            var elems = xmlRoot.GetElementsByTagName(Default_Elem_Name).Cast<XmlElement>()
                .Where(a => a.GetAttribute("key") == key);
            if (elems.Count() == 0)
            { return null; }
            else
            { return elems.Select(a => new ConfigElem(a)).ToList(); }
        }

        public static ConfigElem GetSingle(string key)
        {
            var elems = GetValues(key);
            return (elems == null) ? null : elems.FirstOrDefault();
        }

        #endregion

        #region Exist

        public static bool ExistSection(string name)
        {
            return Sections.Where(a => a.Name == name).Count() != 0 ? true : false;
        }

        public static bool ExistNamed(string name)
        {
            return ElemsNamed.Where(a => a.Name == name).Count() != 0 ? true : false;
        }

        public static bool ExistNamed(string name, string key)
        {
            return ElemsNamed.Where(a => a.Name == name && a.Key == key).Count() != 0 ? true : false;
        }

        public static bool ExistKey(string key)
        {
            return Elems.Where(a => a.Key == key).Count() != 0 ? true : false;
        }

        public static bool Exists()
        {
            return File.Exists(Full_Path);
        }

        #endregion
    }

    public class ConfigElemNamed
    {
        public XmlElement Elem { get; private set; }
        public XmlDocument Doc { get { return Elem.OwnerDocument; } }

        public ConfigElemNamed(XmlElement elem) { Elem = elem; }

        public string Name
        {
            get { return Elem.Name; }
            set
            {
                string _name = Name, _key = Key, _value = Value;
                XmlElement parent = Elem.ParentNode as XmlElement;
                bool removed = false;
                try
                {
                    parent.RemoveChild(Elem);
                    removed = true;
                    parent.AppendChild(new XElement(value, new XAttribute("key", _key), new XAttribute("value", _value)).ToXmlElement(Doc));
                }
                catch (Exception ex)
                {
                    if (removed)
                    { parent.AppendChild(new XElement(_name, new XAttribute("key", _key), new XAttribute("value", _value)).ToXmlElement(Doc)); }
                    throw ex;
                }
            }
        }

        public string Key { get { return Elem.GetAttribute("key"); } }

        public string Value
        {
            get { return Elem.GetAttribute("value"); }
            set { Elem.SetAttribute("value", value ?? ""); }
        }

        public bool Remove() { try { Elem.ParentNode.RemoveChild(Elem); return true; } catch (Exception) { return false; } }
    }

    public class ConfigElem
    {
        private XmlElement Elem { get; set; }
        public XmlDocument Doc { get { return Elem.OwnerDocument; } }

        public ConfigElem(XmlElement elem) { Elem = elem; }

        public string Key { get { return Elem.GetAttribute("key"); } }

        public string Value { get { return Elem.GetAttribute("value"); } set { Elem.SetAttribute("value", value ?? ""); } }

        public bool Remove() { try { Elem.ParentNode.RemoveChild(Elem); return true; } catch (Exception) { return false; } }
    }

    public class ConfigSection
    {
        public XmlElement Section { get; private set; }
        public XmlDocument Doc { get; private set; }

        public string Name { get { return Section.Name; } }

        public ConfigSection(XmlElement section)
        {
            Section = section;
            Doc = Section.OwnerDocument;
        }

        public List<ConfigElemNamed> GetNamed(string name)
        {
            return Section.GetElementsByTagName(name).Cast<XmlElement>().Select(a => new ConfigElemNamed(a)).ToList();
        }

        public List<ConfigElemNamed> GetNamed(string name, string key)
        {
            return Section.GetElementsByTagName(name).Cast<XmlElement>()
                .Where(a => a.GetAttribute("key") == key).Select(a => new ConfigElemNamed(a)).ToList();
        }

        public ConfigElemNamed GetNamedSingle(string name)
        {
            return GetNamed(name).FirstOrDefault();
        }

        public ConfigElemNamed GetNamedSingle(string name, string key)
        {
            return GetNamed(name, key).FirstOrDefault();
        }

        public List<ConfigElem> GetValues(string key)
        {
            return Section.GetElementsByTagName(ConfigFile.Default_Elem_Name).Cast<XmlElement>().Select(a => new ConfigElem(a)).ToList();
        }

        public ConfigElem GetSingle(string key)
        {
            var elem = Section.GetElementsByTagName(ConfigFile.Default_Elem_Name).Cast<XmlElement>()
                .Where(a => a.GetAttribute("key") == key).FirstOrDefault();
            if (elem == null) { return null; }
            return new ConfigElem(elem);
        }

        public bool Remove() { try { Section.ParentNode.RemoveChild(Section); return true; } catch (Exception) { return false; } }

        public bool Add(string key, string value)
        {
            try
            {
                var count = Section.GetElementsByTagName(ConfigFile.Default_Elem_Name).Cast<XmlElement>()
                    .Where(a => a.GetAttribute("key") == key && a.GetAttribute("value") == value).Count();
                if (count != 0) { throw new DuplicateWaitObjectException(); }
                Section.AppendChild(new XElement(ConfigFile.Default_Elem_Name, new XAttribute("key", key), new XAttribute("value", value)).ToXmlElement(Doc));
                Doc.Save(ConfigFile.Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public bool Add_Named(string name, string key, string value)
        {
            try
            {
                var count = Section.GetElementsByTagName(name).Cast<XmlElement>()
                    .Where(a => a.GetAttribute("key") == key && a.GetAttribute("value") == value).Count();
                if (count != 0) { throw new DuplicateWaitObjectException(); }
                Section.AppendChild(new XElement(name, new XAttribute("key", key), new XAttribute("value", value)).ToXmlElement(Doc));
                Doc.Save(ConfigFile.Full_Path);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public bool ExistNamed(string name)
        {
            return GetNamed(name).Count() != 0 ? true : false;
        }

        public bool ExistNamed(string name, string key)
        {
            return GetNamed(name, key).Count() != 0 ? true : false;
        }

        public bool ExistKey(string key)
        {
            return GetValues(key).Count() != 0 ? true : false;
        }
    }

    public static class XElementExtensionsClass
    {
        public static XmlElement ToXmlElement(this XElement el, XmlDocument ownerDocument)
        {
            return (XmlElement)ownerDocument.ReadNode(el.CreateReader());
        }
    }
}