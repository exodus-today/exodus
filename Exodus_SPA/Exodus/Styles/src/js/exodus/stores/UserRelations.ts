//import { observable } from 'mobx';

export class UserRelationsStore {
    ID: number;
    FirstName: string;
    LastName: string;
    Status: number;          
    AvatarBig: string;
    AvatarSmall: string;
    FullName: string;  

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}