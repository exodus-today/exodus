using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Extensions
{
    public static class EnumExtension
    {
        public static int ToInt(this Enum value)
        {
            return (int)Enum.Parse(value.GetType(), value.ToString());
        }
    }
}