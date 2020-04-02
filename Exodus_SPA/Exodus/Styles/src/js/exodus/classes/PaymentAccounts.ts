
import { PaymentAccountType } from '../enums'
import { CardStore } from './CardStore';
import { UserStore } from './UserStore';

export class PaymentAccounts {
    AccountDetails: string;
    AccountID: number;
    AccountType: number; //PaymentAccountType;
    AccountTypeName: string;
    Card: CardStore;    
    User: UserStore;

    constructor(initial: any = {}) {
        Object.assign(this, initial);
    }
}