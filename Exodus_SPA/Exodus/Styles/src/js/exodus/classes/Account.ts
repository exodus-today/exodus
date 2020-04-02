import { UserStore } from './UserStore';
import { CardStore }  from './CardStore';
export class Account {
    AccountID: number;
    AccountType: number;
    AccountDetails: string;
    AccountTypeName: string;
    User: UserStore;
    Card: CardStore;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}