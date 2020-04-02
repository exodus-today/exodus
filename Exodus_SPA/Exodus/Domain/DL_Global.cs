using Exodus.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static class GlobalDL
        {
            public static List<Models.CheckObject> CheckObjectsByID(List<Models.CheckObject> objects)
            {
                DbContext context = new DbContext("Exodus_Direct");
                // create table
                var dt = new DataTable();
                dt.Columns.Add("ID", typeof(long));
                dt.Columns.Add("Type", typeof(string));
                dt.Columns.Add("Exists", typeof(bool));

                foreach (var _object in objects)
                {
                    dt.Rows.Add(_object.ID, _object.Type, 0);
                }

                SqlParameter Parameter = new SqlParameter();
                Parameter.ParameterName = "@InputCheckObjects";
                Parameter.SqlDbType = SqlDbType.Structured;
                Parameter.Value = dt;
                Parameter.TypeName = "dbo.CheckObjectsByID"; //This is sqlParameter getting passed below.

                string command = "EXEC stp_Check_Objects_ByID @InputCheckObjects";
                var rez = context.Database.SqlQuery<Models.CheckObject>(command, Parameter).ToList();

                return rez;
            }

            public static int TokenActionAdd(string token, DateTime? ExpirationDate, string action, long? userID)
            {
                using (var exodusDB = new exodusEntities())
                {
                    var rez = exodusDB.stp_AddTokenAction(token, DateTime.Now, ExpirationDate, action, userID);
                    return rez;
                } 
            }

            public static TokenAction TokenActionGet(string token)
            {
                using (var exodusDB = new exodusEntities())
                {
                    var rez = exodusDB.stp_GetTokenAction(token).FirstOrDefault();
                    if(rez != null)
                    {
                        return new TokenAction()
                        {
                            ActionName = rez.Action,
                            ID = rez.ID,
                            CreationDate = rez.CreationDate,
                            ExpirationDate = rez.ExpirationDate.HasValue ? rez.ExpirationDate.Value : DateTime.MinValue,
                            Token = rez.Token,
                            UserID = rez.UserID.HasValue ? rez.UserID.Value : -1
                        };

                    }
                    return null;
                }
            }
        }
    }
}