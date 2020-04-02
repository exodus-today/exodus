export enum EN_EventType {
    None = 0,
    Tag_Join_Invitation = 1, 
    User_Has_Joined_Tag_Upon_Your_Invitation = 2, //
    User_Has_Left_Tag = 3,
    User_Was_Removed_From_Tag_By_System = 4,
    New_Transaction_Received_Confirmation_Required = 5, //
    Transaction_Was_Confirmed_By_Receiver = 6, //
    User_Status_Became_Red = 7, // 
    User_Status_Became_Green = 8, //
    User_Status_Became_Yellow = 9 
}


export enum EN_ImportantLevel {
    None = 1,   // Неважно
    Low = 2,    // Низкая важность
    Medium = 3, // Средняя
    High = 4,   // Важно
    Urgent = 5  // Сверхважно
}


export enum EN_EventCategory {
    None = 0,
    Tag = 1,
    Transaction = 2,
    User_Status = 3,
    Intention = 4,
    Obligation = 5
}

export enum Currency {
    USD = 1,
    UAH = 2,
    RUB = 3,
    EUR = 4
}

export enum Period {
    Undefined = 1,
    Once = 2,
    Weekly = 3,
    Monthly = 4
}

export enum Status {
    OK = 1,
    RegularHelp = 2,
    Emergency = 3
}

export enum Term {
    Indefinitely = 1,
    UserDefined = 2
}

export enum Size {
    Small,
    Medium,
    Large,
}

export enum TransactionWay {
    Cash = 1,
    Card = 2,
    PayPal = 3,
    WesternUnion = 4,
    BankAccount = 5,
    WebMoney = 6,
    Bitcoin = 7,
}

export enum PaymentAccountType {
    BankCard = 1,
    PayPal = 2,
    WebMoney = 3,
    Bitcoin = 4,
    BankAccount = 5,
}

export enum CreditCardType {
    Visa = 1,
    MasterCard = 2,
    AmericanExpress = 3,
    Discover = 4,
    Maestro = 5,
}

export enum Application {
    H2O = 1,
    Pawnshop = 2,
    Insurance = 3,
    OwnInitiative = 4,
    Direct = 5,
}

export enum AccessType {
    Public = 1,
    Private = 2
}

export enum PaymentPeriod {
    Once = 2,
    Regular = 3,
}

export enum ObligationType {
    None = 0,
    H2OUserHelp = 1
}

export enum ObligationStatusE {
    None = 0,
    Cancelled = 1,
    Pending = 2, //Default   
    Confirmed = 3,
    ForExecution = 4,
    Executed = 5,
    Suspended = 6
}

export enum ObligationClassE {
    None = 0,
    Regular = 1,
    NotClaimable = 2
}

export enum IntentionType {
    None = 0,
    Regular = 1,
    OnDemand = 2
}

export enum FilterIntentions{
    Blijaishie=1, 
    Nastupivshie=2,
    Vse=3,
    Arhiv=4
}

export enum FilterObligation{
    Vse=1,
    Arhiv=2
}

export enum FilterTransaction{
    TransactionReceiver=1,
    TransactionSender=2
}

export enum TagRole {
    None = 0,
    Owner = 1,
    Administrator = 2,
    Member = 3
}


export enum EN_TransferType
{
    Cash = 1,
    Account = 2
}