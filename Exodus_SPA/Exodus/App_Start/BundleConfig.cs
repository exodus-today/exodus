using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Exodus
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/validation.js")
                .Include("~/Scripts/jquery-3.2.1.slim.min.js")
                .Include("~/Scripts/jquery.validate.min.js")
                .Include("~/Scripts/jquery.validate.unobtrusive.min.js"));
        }
    }
}
