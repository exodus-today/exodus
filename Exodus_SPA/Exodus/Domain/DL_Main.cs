using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public static partial class _DL
    {
        public static exodusEntities exodusEntities = null;
        public static SqlConnection sqlConnection = null;

        static _DL()
        {
            //
            /*exodusEntities = new exodusEntities();
            //
            sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["Exodus_Direct"].ConnectionString);
            sqlConnection.Open();*/
        }
    }
}