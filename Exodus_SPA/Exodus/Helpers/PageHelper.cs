using Exodus.Domain;
using Exodus.Enums;
using Exodus.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Security;

namespace Exodus.Helpers
{
    public class PageHelper
    {
        public static string Language
        {
            get { return Global.Global.Language; }
            set { Global.Global.Language = value; }
        }

        public static CultureInfo Culture { get { return new CultureInfo(Language); } }

        public static string GetUserStatusColour(En_CurrentStatus status)
        {
            switch (status)
            {
                case En_CurrentStatus.I_AM_OK: return "success";
                case En_CurrentStatus.I_AM_PARTIALLY_OK: return "warning";
                case En_CurrentStatus.I_NEED_HELP: return "danger";
                default: return "";
            }
        }

        public static string PaymentAccountAddFormName(En_AccountType type)
        {
            switch (type)
            {
                case En_AccountType.Bank_Account: return "BankAccountAddForm";
                case En_AccountType.Bank_Card: return "BankCardAddForm";
                case En_AccountType.Bitcoin: return "BitcoinAddForm";
                case En_AccountType.PayPal: return "PayPalAddForm";
                case En_AccountType.WebMoney: return "WebMoneyAddForm";
                default: return "";
            }        
        }

        public static string PaymentAccountUpdateFormName(En_AccountType type)
        {
            switch (type)
            {
                case En_AccountType.Bank_Account: return "BankAccountUpdateForm";
                case En_AccountType.Bank_Card: return "BankCardUpdateForm";
                case En_AccountType.Bitcoin: return "BitcoinUpdateForm";
                case En_AccountType.PayPal: return "PayPalUpdateForm";
                case En_AccountType.WebMoney: return "WebMoneyUpdateForm";
                default: return "";
            }
        }

        public static string AccountTypeName(En_AccountType type)
        {
            switch (type)
            {
                case En_AccountType.Bank_Account: return Global.Localisation.Get("BankAccount");
                case En_AccountType.Bank_Card: return Global.Localisation.Get("BankCard");
                case En_AccountType.Bitcoin: return "Bitcoin";
                case En_AccountType.PayPal: return "PayPal";
                case En_AccountType.WebMoney: return "WebMoney";
                default: return "";
            }
        }

        public static string GetApplicationUrl(EN_ApplicationType app)
        {
            switch(app)
            {
                case EN_ApplicationType.H20: return "AppH2O";
                case EN_ApplicationType.Own_Initiative: return "AppOwnIniciative";
                default: return "";
            }
        }
    }
}