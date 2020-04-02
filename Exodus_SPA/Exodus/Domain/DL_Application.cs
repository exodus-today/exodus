using Exodus.DTO_Api;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class Application
        {
            public static class Get
            {
                public static VM_Application ByID(int applicationID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var result = exodusDB.stp_Application_ByID(applicationID).FirstOrDefault();


                        VM_Application application = new VM_Application()
                        {
                            ApplicationDescription = result.ApplicationDescription,
                            ApplicationID = result.ApplicationID,
                            ApplicationIsActive = result.ApplicationIsActive,
                            ApplicationNameEng = result.ApplicationNameEng,
                            ApplicationNameRus = result.ApplicationNameRus
                        };
                        return application; 
                    }
                }

                public static List<VM_Application> All()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Application_GetList()
                            .Select(a => new VM_Application()
                            {
                                ApplicationDescription = a.ApplicationDescription,
                                ApplicationID = a.ApplicationID,
                                ApplicationIsActive = a.ApplicationIsActive,
                                ApplicationNameEng = a.ApplicationNameEng,
                                ApplicationNameRus = a.ApplicationNameRus
                            }).ToList();
                    }
                }

                public static DTO_ApplicationSettings Settings(long TagID, int AppID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_App_Settings_Read(TagID, AppID).FirstOrDefault();
                        if (rez != null)
                        {
                            var appSettings = new DTO_ApplicationSettings()
                            {
                                SettingsID = rez.SettingID,
                                ApplicationID = rez.fk_AppID,
                                TagID = rez.fk_TagID
                            };
                            //
                            appSettings.ReadFromXml(rez.Settings);
                            return appSettings;
                        }
                        //
                        return new DTO_ApplicationSettings();
                    }
                }
            }

            public static class Add
            {
                public static long Settings(DTO_ApplicationSettings appSettings)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var SettingID = new ObjectParameter("SettingID", 0);
                        //
                        var rez = exodusDB.stp_App_Settings_Write(
                            appSettings.TagID,
                            appSettings.ApplicationID, 
                            appSettings.Settings,
                            SettingID);
                        //
                        return Convert.ToInt64(SettingID.Value);
                    }
                }
            }
        }
    }
}