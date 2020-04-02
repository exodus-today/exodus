using Exodus.Domain;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class TagRegisterAndJoinDTO
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long UserID { get; set; }
        public long TagID { get; set; }

        public VM_UserRegister TO_VM()
        {
            return new VM_UserRegister()
            {
                InvitedBy = _DL.User.Get.SystemUser(),
                UserFirstName = FirstName,
                UserLastName = LastName,
                UserEmail = Login,
                UserPassword = Password
            };
        }

        public bool Validate()
        {
            return !(
                     string.IsNullOrEmpty(Login.Trim()) ||
                     string.IsNullOrEmpty(Password.Trim()) ||
                     string.IsNullOrEmpty(FirstName.Trim()) ||
                     string.IsNullOrEmpty(LastName.Trim())
                  );
        }
    }
}