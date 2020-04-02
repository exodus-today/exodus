using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Global
{
    public static partial class Cache
    {

        #region Exception

        public static List<string> ExceptionGetIdList()
        {
            return dicExceptionList.Keys.ToList();
        }

        public static bool ExceptionRemoveAll()
        {
            try 
            { 
                dicExceptionList.Clear(); 
                return true; 
            }
            catch (Exception ex)
            {
                Log4Net.Logger.Write_Error(ex);
                return false;
            }
        }

        public static Exception ExceptionGet(string id, bool remove = true)
        {
            if (!dicExceptionList.ContainsKey(id)) { return null; }
            //
            Exception ex =  dicExceptionList[id];
            if (remove) { dicExceptionList.Remove(id); }
            //
            return ex;
        }

        public static bool ExceptionHasAny()
        {
            return dicExceptionList.Count > 0;
        }

        public static bool ExceptionSet(string id, Exception ex)
        {
            if (string.IsNullOrEmpty(id) || ex == null) { return false; }
            //
            dicExceptionList.Add(id, ex);
            return true;
        }

        #endregion
    }
}