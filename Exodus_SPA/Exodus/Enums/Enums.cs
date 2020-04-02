using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Enums
{
    #region GLOBAL

    public enum EN_ViewMenuItem
    {
        MyIntentions = 1,
        FriendIntentions = 2,
        MyObligations = 3,
        ObligationsInMyFavour = 4,
        Transactions = 5,
    }

    public enum En_UserType
    {
        Physical_Person = 1,
        White_Box = 2
    }

    public enum En_CurrentStatus
    {
        I_AM_OK = 1,
        I_AM_PARTIALLY_OK = 2,
        I_NEED_HELP = 3
    }

    public enum En_AccountType
    {
        Bank_Card = 1,
        PayPal = 2,
        WebMoney = 3,
        Bitcoin = 4,
        Bank_Account = 5
    }

    public enum En_ContactType
    {
        Email = 1,
        Phone = 2,
        Facebook = 3,
        VK = 4,
        Skype = 5,
        WhatsApp = 6,
        Address = 7,
        Telegram = 8
    }

    public enum En_Currency
    {
        NONE = 0,
        USD = 1,
        UAH = 2,
        RUB = 3,
        EUR = 4
    }

    public enum En_ReferenceType
    {
        RootUser = 1,
        InvitedUser = 2,
        Bookmark = 3,
        Transaction = 4
    }

    public enum En_HelpPeriods
    {
        Undefined = 1,
        Once = 2,
        Weekly = 3,
        Monthly = 4
    }

    public enum EN_Period
    {
        Undefined = 1,
        Once = 2,
        Weekly = 3,
        Monthly = 4,
        Quarterly = 5,
        Yearly = 6
    }

    public enum En_SearchType
    {
        Search_String = 0,
        Recently_Registered = 1,
        Users_To_Help = 2,
        All_Users = 3
    }

    public enum EN_RegistrationSource
    {
        Exodus = 1,
        Facebook = 2
    }

    public enum EN_Cultures
    {
        Rus,
        Eng
    }

    public enum EN_ApplicationType
    {
        H20 = 1,
        Pawnshop = 2,
        Insurance = 3,
        Own_Initiative = 4,
        UserPublicProfile = 5
    }

    public enum EN_CardType
    {
        None = 0,
        Visa = 1,
        MasterCard = 2,
        AmericanExpress = 3,
        Discover = 4,
        Maestro = 5
    }

    public enum CookieStatus
    {
        Removed = 1,
        NotFound = 2,
        Set = 3,
        Update = 4,
        NotSet = 5
    }

    public enum EN_TransferType
    {
        Cash = 1,
        Account = 2,
        External = 3
    }


    public enum EN_ObligationRoutingType
    {
        Execute = 1,
        Transfer = 2
    }

    public enum EN_SearchObjectType
    {
        User =1,
        Tag = 2
    }

    public enum EN_CheckObjectType
    {
        User,
        Tag,
        Intention,
        Obligation,
        Transaction,
        Event,
        Bank
    }

#endregion

    #region JSON

    public enum EN_API_RequestStatus
    {
        None = 0,
        Success = 1,
        Failed = 2,
        Timeout = 3,
        Fobbiden = 4,
        TokenError = 5
    }

    #endregion

    #region API ERROR CODES

    public enum EN_API_TokenCodes
    {
        Seccess = 1,
        NotFound = 2,
        Invalid = 3,
        Exeption = 4
    }

    #endregion
}