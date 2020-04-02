using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class UserLoginByFacebookDTO
    {
        public string Email { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string ExternalID { get; set; }
        public string PictureSmall { get; set; }
        public string PictureLarge { get; set; }

        public bool Validate()
        {
            if (String.IsNullOrEmpty(UserFirstName) ||
                String.IsNullOrEmpty(UserLastName) ||
                String.IsNullOrEmpty(ExternalID) ||
                String.IsNullOrEmpty(PictureLarge) ||
                String.IsNullOrEmpty(PictureSmall))
            { return false; }
            return true;
        }

        public VM_UserRegister TO_VM()
        {
            return new VM_UserRegister()
            {
                UserFirstName = UserFirstName,
                UserLastName = UserLastName,
                ExternalID = ExternalID,
                RegistrationSource = Enums.EN_RegistrationSource.Facebook,
                UserEmail = Email
            };
        }
    }
}