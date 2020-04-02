using Exodus.Domain;
using Exodus.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Exodus.Helpers
{
    public static class AvatarGenerator
    {
        #region Properties

        public static readonly string AvatarBigFolder = ConfigurationManager.AppSettings["AvatarBigFolder"];
        public static readonly string AvatarSmallFolder = ConfigurationManager.AppSettings["AvatarSmallFolder"];
        //
        public static readonly string DefaultAvatarBigName = ConfigurationManager.AppSettings["DefaultAvatarBigName"];
        public static readonly string DefaultAvatarSmallName = ConfigurationManager.AppSettings["DefaultAvatarSmallName"];
        //
        public static readonly string AvatarBigFolderFull = Path.Combine(Global.Global.ServerPath, AvatarBigFolder.Trim('\\')) + "\\";
        public static readonly string AvatarSmallFolderFull = Path.Combine(Global.Global.ServerPath, AvatarSmallFolder.Trim('\\')) + "\\";
        //
        public static readonly string avatarUrlBigFolder = AvatarBigFolder.Replace("\\", "/");
        public static readonly string avatarUrlSmallFolder = AvatarSmallFolder.Replace("\\", "/");

        public static readonly string avatarBigFolder = "Styles\\dist\\images\\avatar200x200\\";
        public static readonly string avatarSmallFolder = "Styles\\dist\\images\\avatar50x50\\";
        //
        private static readonly double PicSizeBig  = 200;
        private static readonly double PicSizeSmall = 50;
        //
        private static readonly System.Drawing.Imaging.ImageFormat ImageFormat = System.Drawing.Imaging.ImageFormat.Jpeg;
        private static readonly string Extention = ".jpeg";
        
        #endregion

        public static string GetUrlPath(string name, AvatarType type)
        {
            return (type == AvatarType.Big) ? avatarUrlBigFolder + name : avatarUrlSmallFolder + name;
        }

        public static string GetFullPath(string name, AvatarType type)
        {
            return (type == AvatarType.Big) ? AvatarBigFolderFull + name : AvatarSmallFolderFull + name;
        }

        public static UserAvatar Generate(Stream stream, long UserID)
        {
            using (Bitmap bmp = new Bitmap(stream))
            {
                string avatarNameBig = "", avatarNameSmall = "";
                try
                {
                    avatarNameBig =      DrawAndSave(bmp, GetResize(bmp.Width, bmp.Height, PicSizeBig),      AvatarType.Big);
                    avatarNameSmall =    DrawAndSave(bmp, GetResize(bmp.Width, bmp.Height, PicSizeSmall),    AvatarType.Small);
                    UserAvatar updateAvatar = new UserAvatar(avatarNameBig, avatarNameSmall);
                    // Async Delete From File
                    Task.Factory.StartNew((object input) =>
                    {
                        UserAvatar oldAvatar = (UserAvatar)input;
                        //
                        if (!oldAvatar.IsDefault)
                        {
                            if (File.Exists(oldAvatar.AvatarBigFull)) { File.Delete(oldAvatar.AvatarBigFull); }
                            if (File.Exists(oldAvatar.AvatarSmallFull)) { File.Delete(oldAvatar.AvatarSmallFull); }
                        }
                        // Update Cache
                    }, Global.Cache.GetAvatar(UserID));
                    //
                    bmp.Dispose();
                    return Global.Cache.UpdateUserAvatar(UserID, _DL.User.Update.Avatar(UserID, updateAvatar), true);
                }
                catch (Exception ex)
                {
                    // Async Delete
                    Task.Factory.StartNew((object avatar) =>
                    {
                        UserAvatar uploadedAvatar = (UserAvatar)avatar;
                        if (File.Exists(uploadedAvatar.AvatarBigFull))      { File.Delete(uploadedAvatar.AvatarBigFull); }
                        if (File.Exists(uploadedAvatar.AvatarSmallFull))    { File.Delete(uploadedAvatar.AvatarSmallFull); }
                    }, new UserAvatar(avatarNameBig, avatarNameSmall));
                    //
                    bmp.Dispose();
                    Log4Net.Logger.Write_Error(ex); 
                    // return Cache
                    return Global.Cache.GetAvatar(UserID);
                }
            }
        }

        private static Rectangle GetResize(int Width, int Height, double Size)
        {
            double resize = new double[] { Width, Height }.Select(a => a / Size).Min();
            //
            int width = (int)(Width / resize);
            int height = (int)(Height / resize);
            //
            if (width > height)
            { return new Rectangle((int)((width - Size) / 2.0) * -1, 0, width, height);  }
            else
            { return new Rectangle(0, (int)((height - Size) / 2.0) * -1, width, height); }
        }

        private static string DrawAndSave(Bitmap src, Rectangle rect, AvatarType avatarType)
        {
            int size = avatarType == AvatarType.Big ? (int)PicSizeBig : (int)PicSizeSmall;
            //
            using (Bitmap avatar = new Bitmap(size, size))
            {
                using (Graphics g = Graphics.FromImage(avatar))
                {
                    // Settings
                    g.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy;
                    g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    // Draw
                    g.DrawImage(src, rect);
                    g.Dispose();
                }
                // Generate Name
                string guid = Guid.NewGuid().ToString();
                //
                string fName = GetFullPath($"{guid}{Extention}", avatarType);
                // Save
                avatar.Save(fName, ImageFormat);
                avatar.Dispose();
                // return
                return $"{guid}{Extention}";
            }
        }
    }

    public enum AvatarType
    {
        Small,
        Big
    }
}