import { HelpDetail } from "./HelpDetail";
export class LightJson {
    UserFullName: string;
    UserStatus: string
    UserStatusMessage:string
    UserAvatarSMALL:string
    UserAvatarBIG:string
    UserID:number
    UserStatusID:number
    EventID:number
    ApplicationID:number
    TagID:number
    TagDescription:string
    Category:number
    ImportanLevel:number
    Type:number
    Title:string
    Added:Date
    InvitedUserFullName:string
    InvitedUserAvatarSMALL:string
    InvitedUserAvatarBIG:string   
    InviterUserAvatarBIG:string 
    HelpDetail:HelpDetail
    ReceiverID:string
    SenderID:string
    TransactionID: number
    ObligationID:number
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}