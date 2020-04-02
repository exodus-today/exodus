using Exodus.Controllers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;

namespace Exodus.Global
{
    public static class Check_Attributes
    {
        // Constructor
        static Check_Attributes()
        {
            Assembly.GetExecutingAssembly().GetTypes() // Get Types
            .Where(type => typeof(BaseController).IsAssignableFrom(type)) // BaseController Type
            .SelectMany(a => a.GetMethods()) // Get All Methods
            .Where(a => a.GetCustomAttributes<System.Web.Mvc.AllowAnonymousAttribute>().Any()) // Select Where AllowAnonymousAttribute
            .Select(a => String.Format("{0}/{1}", a.DeclaringType.Name.Replace("Controller", ""), a.Name)) // Get Names
            .Distinct().ToList() // Distinct To List
            .ForEach(a => AnonymousActionHashSet.Add(a)); // Fill HashSet
             //
            Assembly.GetExecutingAssembly().GetTypes() // Get Types
            .Where(type => typeof(BaseController).IsAssignableFrom(type)) // BaseController Type
            .SelectMany(a => a.GetMethods()) // Get All Methods
            .Select(a => String.Format("{0}/{1}", a.DeclaringType.Name.Replace("Controller", ""), a.Name)) // Get Names
            .Distinct().ToList() // Distinct To List
            .ForEach(a => AllActionHashSet.Add(a)); // Fill HashSet
        }

        private static Regex regEx = new Regex(@"\/[a-zA-Z]{2}\/");

        // HashSet
        private static HashSet<string> AnonymousActionHashSet = new HashSet<string>();

        // HashSet
        private static HashSet<string> AllActionHashSet = new HashSet<string>();

        public static bool IsAnonymousAction(string AbsolutePath)
        {
            // get path
            AbsolutePath = regEx.IsMatch(AbsolutePath) ? AbsolutePath.Substring(4) : AbsolutePath.Substring(1);
            // check
            return AnonymousActionHashSet.Contains(AbsolutePath);
        }

        public static bool ExistssAction(string AbsolutePath)
        { 
            // get path
            AbsolutePath = regEx.IsMatch(AbsolutePath) ? AbsolutePath.Substring(4) : AbsolutePath.Substring(1);
            // check
            return AllActionHashSet.Contains(AbsolutePath);
        }
    }
}