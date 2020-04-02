using Exodus.Exceptions;
using Exodus.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Xml;

namespace Exodus.Global
{
    public static class Localisation
    {
        #region Properties

        public static LocalisationInitException LastError { get; set; } = null;

        public static Dictionary<CultureInfo, Dictionary<string, string>> Languages { get; set; } =
            new Dictionary<CultureInfo, Dictionary<string, string>>();

        private static string FullPath { get; set; }

        private static string Path { get; set; }


        public static List<CultureInfo> AvalibleCultures { get; private set; } = new List<CultureInfo>();

        public static List<string> AvalibleLanguages { get; private set; } = new List<string>();

        public static string DefaultLanguage { get; set; }

        public static Dictionary<string, string> GetLocalisationDic(string lang)
        {
            CultureInfo culture = new CultureInfo(lang);
            if (Languages.ContainsKey(culture))
            { return Languages[culture]; }
            else
            { return new Dictionary<string, string>(); }
        }

        #endregion

        public static bool IsCultureAvalible(string lang)
        {
            CultureInfo culture = new CultureInfo(lang);
            return Localisation.AvalibleCultures.Contains(culture);
        }

        public static bool IsCultureAvalible(CultureInfo culture)
        {
            return Localisation.AvalibleCultures.Contains(culture);
        }

        public static void Init()
        {
            //
            DefaultLanguage = Configuration.ConfigFile.GetNamedSingle("Localisation", "default").Value ?? "ru";
            Path = Configuration.ConfigFile.GetNamedSingle("Localisation", "path").Value;
            FullPath = HostingEnvironment.MapPath(Path);
            // langs Only XML
            List<string> files = Directory.GetFiles(FullPath, "*.xml").ToList();
            var newLangs = new Dictionary<CultureInfo, Dictionary<string, string>>();
            // Check
            if (ValidFilesKeys(files))
            {
                // Fill langs
                files.ForEach(file => FillLang(file, ref newLangs));
            }
            // Set Langs
            Languages = newLangs;
        }

        public static void Update()
        {
            // langs Only XML
            List<string> files = Directory.GetFiles(FullPath, "*.xml").ToList();
            var newLangs = new Dictionary<CultureInfo, Dictionary<string, string>>();
            // Check
            if (ValidFilesKeys(files))
            {
                // Fill langs
                files.ForEach(file => FillLang(file, ref newLangs));
            }
            // Set Langs
            Languages = newLangs;
        }

        private static bool ValidFilesKeys(List<string> files)
        {
            StringBuilder builder = new StringBuilder();
            List<Tuple<CultureInfo, List<string>>> checkList = new List<Tuple<CultureInfo, List<string>>>();
            foreach (var file in files)
            {
                string langName = new FileInfo(file).Name.Replace(".xml", "");
                XmlDocument doc = new XmlDocument();
                doc.Load(file);
                var list = doc.GetElementsByTagName("word").Cast<XmlElement>().Select(a => a.GetAttribute("key")).ToList();
                CultureInfo culture = new CultureInfo(langName);
                checkList.Add(new Tuple<CultureInfo, List<string>>(culture, list));
            }
            // check keys count
            if (checkList.Select(a => a.Item2.Count).Distinct().Count() != 1)
            {
                builder.Append("Incorrect keys count\r\n");
                foreach (var list in checkList)
                { builder.AppendFormat("Language [{0}] Keys: [{1}]\r\n", list.Item1, list.Item2.Count); }

                var allKeys = checkList.SelectMany(a => a.Item2).Distinct();
                foreach (var list in checkList)
                {
                    foreach (var item in allKeys)
                    {
                        if (list.Item2.IndexOf(item) == -1)
                        { builder.AppendFormat("Language [{0}] Key: [{1}] not found\r\n", list.Item1, item); }
                    }
                }
            }
            // check duplicate
            int keyCount = checkList.First().Item2.Count;
            if (checkList.Select(a => a.Item2.Distinct().Count()).Where(a => a != keyCount).Count() != 0)
            {
                builder.Append("Duplicate keys\r\n");
                foreach (var item in checkList)
                {
                    var duplicates = item.Item2.GroupBy(x => x).Where(g => g.Count() > 1).Select(a => a.Key);
                    builder.AppendFormat("IN {0}\r\n", item.Item1.TwoLetterISOLanguageName);
                    builder.Append(String.Join(",", duplicates) + "\r\n");
                }
            }
            // chek errors
            if (builder.Length != 0)
            {
                throw new LocalisationInitException(builder.ToString());
            }
            else
            { return true; }
        }

        private static void FillLang(string filePath, ref Dictionary<CultureInfo, Dictionary<string, string>> Langs)
        {
            string langName = "";
            try
            {
                langName = new FileInfo(filePath).Name.Replace(".xml", "");
                CultureInfo culture = new CultureInfo(langName);
                XmlDocument doc = new XmlDocument();
                Dictionary<string, string> keyWord = new Dictionary<string, string>();
                doc.Load(filePath);
                foreach (XmlElement elem in doc.GetElementsByTagName("word"))
                {
                    keyWord.Add(elem.GetAttribute("key"), elem.GetAttribute("value"));
                }
                //
                Langs.Add(culture, keyWord);
                // add culture
                if (!AvalibleCultures.Contains(culture))
                { AvalibleCultures.Add(culture); }
                //
                if (!AvalibleLanguages.Contains(culture.TwoLetterISOLanguageName.ToLower()))
                { AvalibleLanguages.Add(culture.TwoLetterISOLanguageName.ToLower()); }
            }
            catch (CultureNotFoundException)
            { throw new LanguageNotFoundException($"Lang {langName} not found"); }
            catch (FileNotFoundException ex)
            { throw new ExodusException($"Lang file {filePath} not found", ex); }
            catch (XmlException ex)
            { throw new ExodusException($"Lang Loading exeption from {filePath}", ex); }
            catch (Exception ex)
            { throw new ExodusException("Localisation exeption", ex); }
        }

        public static string Get(string key, string lang = null)
        {
            if (LastError != null) { throw LastError; }
            lang = lang ?? Global.Language;
            try
            {
                CultureInfo culture = new CultureInfo(lang);
                Dictionary<string, string> words = Languages[culture];
                string word = words[key];
                return word;
            }
            catch (CultureNotFoundException)
            {
                if (LastError != null) { throw LastError; }
                throw new LanguageNotFoundException($"Lang {lang} not found");
            }
            catch (KeyNotFoundException)
            {
                if (LastError != null) { throw LastError; }
                throw new ExodusException($"Key {key} not found");
            }
            catch (Exception ex)
            {
                if (LastError != null) { throw LastError; }
                throw new ExodusException("Localisation exeption", ex);
            }
        }

        public static string GetLanguageByIP(string ipAddress)
        {
            byte[] response = null;
            string countryCode = "";
            using (var client = new WebClient())
            {
                var values = new NameValueCollection();
                values.Add("ip", ipAddress);
                try { response = client.UploadValues("https://iplocation.com/", values); } catch { return "ru"; }
                // convert from bytes
                var responseString = Encoding.UTF8.GetString(response);
                // get country code
                countryCode = responseString.Split(new char[] { ',' }).First(a => a.IndexOf("country_code") != -1).Split(new char[] { ':' }).Last().Trim().Replace("\"", "");
            }
            // return language
            switch (countryCode.ToLower())
            {
                case "ua": case "ru": case "be": return "ru"; // ru
                default: return "en";// en
            }
        }
    }
}