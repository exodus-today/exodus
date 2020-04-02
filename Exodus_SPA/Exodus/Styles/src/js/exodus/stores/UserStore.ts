import { observable } from 'mobx';
import { Status } from '../enums';

export class UserStore {
    @observable UserID: number;
    @observable UserFirstName: string;
    @observable UserLastName: string;
    @observable UserStatus: Status;
    @observable AvatarSmall: string;
    @observable AvatarBig: string;
    @observable ApiKey: string;
    @observable UserFullName: string;
    @observable Status: string;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}