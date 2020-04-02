import { Status } from '../enums';
import { HelpDetail } from './HelpDetail';

export class UserStore {
    HelpDetail:HelpDetail;
InvitedBy:UserStore;
    UserID: number;
    UserExternalID:number;
    UserGuid: any;
    UserFirstName: string;
    UserLastName: string;
    UserEmail: string;
    UserType: number;
    UserStatus: number;
    UserStatusMessage: string;
    UserAbout: string;
    UserRegistrationSource: number;
    ApiKey: string;
Avatar: AvatarStore;
    UserFlags: any; 
    UserFullName: string;
    UserRegistered: string;
    Contacts: string;
    AvatarBIG: string;
    AvatarSMALL: string;    
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}

export class AvatarStore {
    AvatarBIG: string;
    AvatarSMALL: string;
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}