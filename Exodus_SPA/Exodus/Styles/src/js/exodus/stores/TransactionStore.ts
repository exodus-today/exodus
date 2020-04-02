import { observable } from 'mobx';
import { TransactionWay, Currency } from '../enums';
import { PaymentAccountStore } from './PaymentAccountStore';
import { Moment } from 'moment';
import { UserStore } from './UserStore';

export class TransactionStore {
    @observable ApplicationID: number;
    @observable PaymentAccount: PaymentAccountStore|null;
    @observable UserReceiver: UserStore;
    @observable TagID: number;
    @observable TransactionWay: TransactionWay;
    @observable Currency: Currency;
    @observable Amount: number;
    @observable TransactionDate: Moment|null;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}
