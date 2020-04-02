using Exodus.Enums;
using Exodus.Security;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Exodus.Domain
{
    public static partial class _DL
    {      
        public static class Banks
        {
            public static class Get
            {
                public static List<VM_Bank> BankNames()
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_BankNames()
                            .Select(a => new VM_Bank()
                            {
                                BankID = a.BankID,
                                BankName = a.BankName
                            }).ToList();
                    }
                }

                public static List<VM_Bank> BankNamesByCardNumber(string cardnumber, int count = 0)
                {
                    using (var exodusDB = new exodusEntities())
                    {
                        return exodusDB.stp_GetBankNamesByCardNumber(cardnumber)
                            .Take(count <= 0 ? int.MaxValue : count)
                            .Select(a => new VM_Bank()
                            {
                                BankID = a.BankID,
                                BankName = a.BankName
                            }).ToList();
                    }
                }
            }
        }
    }
}