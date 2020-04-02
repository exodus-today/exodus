using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Xml;
using Exodus.Enums;
using Exodus.Extensions;
using Exodus.ViewModels;
using EntityFrameworkExtras.EF6;
using System.Data.Entity;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class Events
        {
            public static class Get
            {

                public static List<VM_Event> EventList_Read_ByUserID(long UserID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_EventList_Read_ByUserID(UserID);
                        //
                        return rezult
                            .Select(a => new VM_Event()
                            {
                                ID = a.EventID,
                                Added = a.EventAdded,
                                Application = a.fk_ApplicationID.HasValue ? new VM_Application() { ApplicationID = a.fk_ApplicationID.Value } : null,
                                Category = new VM_EventCategory()
                                {
                                    ID = a.EventCategoryID,
                                    Comment = a.EventCategoryComment,
                                    NameEng = a.EventCategoryNameEng,
                                    NameRus = a.EventCategoryNameRus,
                                },
                                Tag = a.fk_TagID.HasValue ? new VM_Tag() { TagID = a.fk_TagID.Value } : null,
                                Type = new VM_EventType()
                                {
                                    ID = a.EventTypeID,
                                    Comment = a.EventTypeComment,
                                    EventCategory = new VM_EventCategory()
                                    {
                                        ID = a.EventCategoryID,
                                        Comment = a.EventCategoryComment,
                                        NameEng = a.EventCategoryNameEng,
                                        NameRus = a.EventCategoryNameRus,
                                    },
                                },
                                Title = a.EventTitle,
                                ImportanLevel = new VM_ImportanLevel()
                                {
                                    Comment = a.ImportanceLevelComment,
                                    ID = a.ImportanceLevelID,
                                    NameEng = a.ImportanceLevelNameEng,
                                    NameRus = a.ImportanceLevelNameRus
                                },
                                Thumbnail = new XmlDocument().FromString(a.EventThumbnail),
                                Content = new XmlDocument().FromString(a.EventContent)
                            }).ToList();
                    }
                }

                public static VM_EventTemplate EventTemplate_ByEventTypeID(EN_EventType EventType)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_EventTemplate_ByEventTypeID(EventType.ToInt()).FirstOrDefault();
                        if (rez != null)
                        {
                            var template = new VM_EventTemplate()
                            {
                                eventType = new VM_EventType() { ID = rez.fk_EventTypeID },
                                ID = rez.EventTemplateID,
                                TitleEng = rez.EventTitleEng,
                                TitleRus = rez.EventTitleRus
                            };
                            // Create XML
                            template.Content.LoadXml(rez.EventContent);
                            template.Thumbnail.LoadXml(rez.EventThumbnail);
                            // return template
                            return template;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }

                public static List<VM_Event> EventList_ByUserID(long UserID, bool isHideProcessed = true)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rezult = exodusDB.stp_EventList_ByUserID(UserID, isHideProcessed);
                        //
                        return rezult
                            .Select(a => new VM_Event()
                            {
                                ID = a.EventID,
                                Added = a.EventAdded,
                                Application = a.fk_ApplicationID.HasValue ? new VM_Application() { ApplicationID = a.fk_ApplicationID.Value } : null,
                                Category = new VM_EventCategory()
                                {
                                    ID = a.EventCategoryID,
                                    Comment = a.EventCategoryComment,
                                    NameEng = a.EventCategoryNameEng,
                                    NameRus = a.EventCategoryNameRus,
                                },
                                Tag = a.fk_TagID.HasValue ? new VM_Tag() { TagID = a.fk_TagID.Value } : null,
                                Type = new VM_EventType()
                                {
                                    ID = a.EventTypeID,
                                    Comment = a.EventTypeComment,
                                    EventCategory = new VM_EventCategory()
                                    {
                                        ID = a.EventCategoryID,
                                        Comment = a.EventCategoryComment,
                                        NameEng = a.EventCategoryNameEng,
                                        NameRus = a.EventCategoryNameRus,
                                    },
                                },
                                Title = a.EventTitle,
                                ImportanLevel = new VM_ImportanLevel()
                                {
                                    Comment = a.ImportanceLevelComment,
                                    ID = a.ImportanceLevelID,
                                    NameEng = a.ImportanceLevelNameEng,
                                    NameRus = a.ImportanceLevelNameRus
                                },
                                Thumbnail = new XmlDocument().FromString(a.EventThumbnail),
                                Content = new XmlDocument().FromString(a.EventContent)            
                            }).ToList();
                    }
                }

                public static VM_Event Event_Single_ByUserID(long UserID, long EventID)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Event_Single_ByUserID(UserID, EventID).FirstOrDefault();
                        return new VM_Event()
                        {
                            ID = rez.EventID,
                            Added = rez.EventAdded,
                            Application = rez.fk_ApplicationID.HasValue ? new VM_Application() { ApplicationID = rez.fk_ApplicationID.Value } : null,
                            Category = new VM_EventCategory()
                            {
                                ID = rez.EventCategoryID,
                                Comment = rez.EventCategoryComment,
                                NameEng = rez.EventCategoryNameEng,
                                NameRus = rez.EventCategoryNameRus,
                            },
                            Tag = rez.fk_TagID.HasValue ? new VM_Tag() { TagID = rez.fk_TagID.Value } : null,
                            Type = new VM_EventType()
                            {
                                ID = rez.EventTypeID,
                                Comment = rez.EventTypeComment,
                                EventCategory = new VM_EventCategory()
                                {
                                    ID = rez.EventCategoryID,
                                    Comment = rez.EventCategoryComment,
                                    NameEng = rez.EventCategoryNameEng,
                                    NameRus = rez.EventCategoryNameRus,
                                },
                            },
                            Title = rez.EventTitle,
                            ImportanLevel = new VM_ImportanLevel()
                            {
                                Comment = rez.ImportanceLevelComment,
                                ID = rez.ImportanceLevelID,
                                NameEng = rez.ImportanceLevelNameEng,
                                NameRus = rez.ImportanceLevelNameRus
                            },

                        };
                    }
                }

                public static VM_Event ByID(long EventID)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        var rez = exodusDB.stp_Event_ByID(EventID).FirstOrDefault();
                        if (rez != null)
                        {
                            var tag = rez.fk_TagID.HasValue ? _DL.Tag.Get.ByID(rez.fk_TagID.Value) : null;
                            //
                            var _event = new VM_Event()
                            {
                                ID = rez.EventID,
                                Title = rez.EventTitle,
                                Added = rez.EventAdded,
                                Category = new VM_EventCategory() { ID = rez.fk_EventCategoryID },
                                Type = Global.Cache.dicEventTypes[(EN_EventType)rez.fk_EventTypeID],
                                Tag = tag ?? new VM_Tag(),
                                Application = (tag == null) ? new VM_Application() : Global.Cache.dicApplications[tag.ApplicationType],
                                ImportanLevel = new VM_ImportanLevel() { ID = (int)Global.Cache.dicEventTypes[(EN_EventType)rez.fk_EventTypeID].ImportantLevel }
                            };
                            // load XML
                            _event.Content.LoadXml(rez.EventContent);
                            _event.Thumbnail.LoadXml(rez.EventThumbnail);
                            return _event;
                        };
                    }
                    return null;
                }

                public static List<long> ListID()
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_EventListID().Select(a => a.Value).ToList();
                    }
                }

                public static List<VM_EventType> Event_Types()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Event_GetEventTypes().Select(a => new VM_EventType()
                        {
                            Comment = a.EventTypeComment,
                            EventCategory = new VM_EventCategory() { ID = a.fk_EventCategoryID },
                            ID = a.EventTypeID,
                            ImportantLevel = (EN_ImportantLevel)a.fk_ImportanceLevelID,
                            NameEng = a.EventTypeNameEng,
                            NameRus = a.EventTypeNameRus
                        }).ToList();
                    }
                }
            }

            public static class Add
            {
                public static long Event(VM_Event Event)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        ObjectParameter eventID = new ObjectParameter("EventID", 0);
                        //
                        exodusDB.stp_Event_Add(
                            eventTypeID: Event.Type.ID,
                            eventTitle: Event.Title,
                            eventContent: Event.Content.OuterXml,
                            eventThumbnail: Event.Thumbnail.OuterXml,
                            tagID: Event.Tag == null ? new long?() : Event.Tag.TagID,
                            applicationID: Event.Application == null ? new int?() : Event.Application.ApplicationID,
                            eventID: eventID);
                        //
                        return Convert.ToInt64(eventID.Value);
                    }
                }

                public static long EventToUsers(long EventID, long UserID)
                {
                    DbContext context = new DbContext("Exodus_Direct");
                    var dt = new DataTable();
                    dt.Columns.Add("EventID", typeof(long));
                    dt.Columns.Add("UserID", typeof(long));
                    dt.Rows.Add(EventID, UserID);

                    SqlParameter Parameter = new SqlParameter();
                    Parameter.ParameterName = "@EventUsers";
                    Parameter.SqlDbType = SqlDbType.Structured;
                    Parameter.Value = dt;
                    Parameter.TypeName = "dbo.EventToUsers"; //This is sqlParameter getting passed below.

                    string command = "EXEC stp_Event_ToUsers_Add @EventUsers";
                    var rez = context.Database.ExecuteSqlCommand(command, Parameter);

                    return rez;
                }

                public static long EventToUsers(long EventID, List<long> listUserID)
                {
                    DbContext context = new DbContext("Exodus_Direct");
                    // create table
                    var dt = new DataTable();
                    dt.Columns.Add("EventID", typeof(long));
                    dt.Columns.Add("UserID", typeof(long));

                    foreach (var UserID in listUserID)
                    { dt.Rows.Add(EventID, UserID); }

                    SqlParameter Parameter = new SqlParameter();
                    Parameter.ParameterName = "@EventUsers";
                    Parameter.SqlDbType = SqlDbType.Structured;
                    Parameter.Value = dt;
                    Parameter.TypeName = "dbo.EventToUsers"; //This is sqlParameter getting passed below.

                    string command = "EXEC stp_Event_ToUsers_Add @EventUsers";
                    var rez = context.Database.ExecuteSqlCommand(command, Parameter);

                    return rez;
                }
            }

            public static class Update
            {
                public static int TagID_AppID_XML(long EventID, string Thumbnail, string Content, long? TagID, long? ApplicationID)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_EventUpdate_XML(EventID, Thumbnail, Content, TagID, ApplicationID);
                    }
                }

                /*public static int Thumbnail(long EventID, string Thumbnail)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_EventUpdate_Thumbnail(EventID, Thumbnail);
                    }
                }*/

                public static int MarkETU_Processed(long UserID, long EventID)
                {
                    using (exodusEntities exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_Event_MarkETU_Processed(eventID:EventID, userID:UserID);
                    }
                }
            }

            public static class Delete
            {
                public static long ByID(long EventID)
                {
                    using (exodusEntities db = new exodusEntities())
                    {
                        return db.stp_EventDeleteByID(EventID);
                    }
                }
            }
        }

    }
}