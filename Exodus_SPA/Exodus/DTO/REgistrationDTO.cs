using Exodus.Domain;
using Exodus.ViewModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.DTO
{
    public class UserRegister_DTO
    {

        public long TagID { get; set; } = -1;
        public long InviteUserID { get; set; } = -1;

        [Required]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public VM_UserRegister ViewModel
        {
            get
            {
                return new VM_UserRegister()
                {
                    InvitedBy = InviteUserID == -1 ? _DL.User.Get.SystemUser() : _DL.User.Get.ByID(InviteUserID),
                    UserFirstName = FirstName,
                    UserLastName = LastName,
                    UserEmail = Email,
                    UserPassword = Password
                };
            }
        }

        public bool Validate()
        {
            return !(
                    string.IsNullOrEmpty(FirstName.Trim()) ||
                    string.IsNullOrEmpty(LastName.Trim()) ||
                    string.IsNullOrEmpty(Email.Trim()) ||
                    string.IsNullOrEmpty(Password.Trim())
                    );
        }
    }
}