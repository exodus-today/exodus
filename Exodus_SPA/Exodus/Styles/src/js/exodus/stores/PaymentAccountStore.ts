import { observable } from 'mobx';
import { PaymentAccountType, CreditCardType } from '../enums';
import { UserStore } from '../classes/UserStore';

export class PaymentAccountStore {
    @observable AccountID: number;
    @observable AccountType: any //PaymentAccountType;
    @observable AccountDetails: string;
    @observable AccountTypeName: string;
    @observable Card: CreditCardStore;
    @observable User: UserStore;

    constructor(initial: any = {}) {
        Object.assign(this, initial); //, { Card: new CreditCardStore(initial.Card) }, { User: new UserStore(initial.User) }
    }
}

export class CreditCardStore {
    @observable CardID: number;
    @observable TypeID: CreditCardType;
    @observable BankID: number;
    @observable BankName: string;
    @observable CardNumber: string;
    @observable CardValidTill: Date;
    @observable AdditionalInfo: string;

    constructor(initial = {}) {
        Object.assign(this, initial);
    }
}
