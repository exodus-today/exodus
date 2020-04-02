import { HelpDetail } from "./HelpDetail";

export class EventsListData {
    // 1 
    Added: Date 
    ApplicationID: number
    ApplicationName: string
    TagID:number
    Category: number
    EventID: number
    ImportanLevel: number
    UserID: number
    TotalAmount: number
    MinIntentionAmount: number
    EndDate: Date | string
    HelpDetail: HelpDetail

    //10
    HolderAvatarSMALL: string
    IssuerAvatarSMALL: string
    TagDescription:string
    TagPeriod:string
    ObligationKind:string


    InvitedUserAvatarSMALL: string
    InvitedUserAvatarBIG: string
    InvitedUserFullName: string
    InviterUserAvatarSMALL: string
    InviterUserAvatarBIG: string
    InviterUserFullName: string
    InviterUserID: number
    InvitedUserID: number
    
    TagName: string
    Title: string
    Type: number
    className: string

    UserAvatarSMALL: string  // 7 8 9
    UserAvatarBIG: string  // 00000
    UserStatus: string
    UserFullName: string


    ReceiverID:string
    ReceiverFullName: string  // 6 
    ReceiverAvatarSMALL: string
    ReceiverStatus: string
    ReceiverAvatarBIG:string
    TransactionMemo:string
    TransactionAmount:string

     SenderID:string
    SenderFullName: string
    SenderAvatarSMALL: string
    SenderAvatarBIG: string
    SenderStatus: string
    TransferType: string
    Amount: string
    Currency: number
    IsConfirmed: number

    Period:string
    DayOfMonth:number
    DayOfWeek:number
    
    //12
    ReportedUserAvatarSMALL:string
    ReportedUserAvatarBIG:string
    ReportedUserFullName:string
    ReportedUserID:number

    TransactionID:number

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}