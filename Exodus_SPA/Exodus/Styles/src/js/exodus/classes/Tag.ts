export class Tag {
    TagID: number;
    NameSystem: null
    NameEng: string
    NameRus: string
    Description: string
    Created: any
    Owner_UserID: number
    OwnerFirstName: any
    OwnerLastName: any
    Type: number
    TypeNameEng: string
    TypeNameRus: string
    TypeCommentEng: string
    TypeCommentRus: string
    IsTypePredefined: any
    AccessType: any
    AccessTypeNameEng:string
    AccessTypeNameRus:string
    UsersCount: number
    Added: Date
    Role: any
    Period: any
    PeriodNameRus: string
    PeriodNameEng: string
    ApplicationID: number
    ApplicationNameRus: string
    ApplicationNameEng: string
    EndDate: Date
    DayOfMonth: number
    DayOfWeek: number
    TotalAmount: number
    TotalAmountCurrencyID: number
    TotalAmountCurrencyCode:any
    MinIntentionAmount: number
    MinIntentionCurrencyID: number
    MinIntentionCurrencyCode: number
    DIO: any
    LinkToJoin: string
    IDXor: number

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}