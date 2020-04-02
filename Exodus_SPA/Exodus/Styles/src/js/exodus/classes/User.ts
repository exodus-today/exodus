import { Status } from '../enums';
import { HelpDetail } from './HelpDetail';

export class User {
    Accounts: any;
    ApiKey: string;
    AvatarBig: string;    
    AvatarSmall: string;
    HelpDetail:HelpDetail;
    InvitedBy:number;    
    UserAbout: string;
    UserEmail: string;
    UserFirstName: string;
    UserFlags: any;
    UserFullName: string;
    UserGuid: any;
    UserID: number;
    UserLastName: string;
    UserRegistered: string;
    UserRegistrationSource: number;
    UserStatus: Status;
    UserStatusMessage: string;
    UserType: any;
    
    Contacts: string;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}