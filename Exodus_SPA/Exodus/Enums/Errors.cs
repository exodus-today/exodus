using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exodus.Enums
{
    public enum EN_ErrorCodes
    {
        NoException = -1,
        SystemExeption = 0,
        BaseExeption = 1,
        UserNotFound = 2,
        IncorrectTag = 3,
        IncorrectUser =4,
        NotFound = 5,
        NoData = 6,
        DataBase = 7,
        LanguageNotFound = 8,
        CardNotFound = 9,
        TagNotFound = 10,
        IntentionNotFound = 11,
        CanNotAddYourSelf = 12,
        Validation = 13,
        BankNotFound = 14,
        Forbidden = 15,
        ApplicationNotFound = 16,
        PaymentAccountNotFound = 17,
        IncorrectPaymentAccountType = 18,
        Registration = 19,
        InviteCode = 20,
        UserExist = 21,
        Login = 22,
        TagException = 23,
        ObligationNotFound = 24,
        YouHaveAlreadyInTag = 25,
        LocalisationInit = 26,
        IncorrectFileType = 27,
        TagNameIsEmpty = 28,
        TagAccessTypeIsNone = 29,
        TagTypeIsNone = 30,
        EndDateNotValid = 31,
        IncorrectLogin = 32,
        IncorrectPassword = 33,
        EventTypeNotFound = 34,
        ApplicationStartupExceptionList = 35,

        api_EventTemplate_IncorrectValueType = 36,
        api_EventTemplate_IncorrectKey = 37,
        TransactionNotFound = 38,
        TokenActionNotFound = 39,
        TokenExpirationDateFaled = 40
    }
}