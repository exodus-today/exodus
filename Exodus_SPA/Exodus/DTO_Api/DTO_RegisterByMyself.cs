using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Exodus.ViewModels;
using Exodus.Domain;
using static Exodus.Security.Security;
using Newtonsoft.Json;

namespace Exodus.DTO_Api
{
    public class DTO_RegisterByMyself
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set;  }
        public string Password { get; set; }

        [JsonIgnore]
        public VM_UserRegister ViewModel
        {
            get
            {
                return new VM_UserRegister()
                {
                    InvitedBy = _DL.User.Get.SystemUser(),
                    UserFirstName = FirstName,
                    UserLastName = LastName,
                    UserPassword = Password,
                    UserEmail = Email,
                    UserLoginDetails = HashHMACSHA1.CreateSaltedHash(this.Password, 10)
                };
            }
        }
    }
}