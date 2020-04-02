import { Currency as En_Currency } from '../enums'
import { EN_TransferType } from '../enums'
import { User as VM_User } from './User';
import { Tag as VM_Tag } from './Tag';
import { Application as VM_Application } from './Application';
import { Obligation as VM_Obligation } from './Obligation';
import { Account as VM_Account } from './Account';
import { PaymentAccounts as VM_PaymentAccount } from './PaymentAccounts';
export class Transaction {
    TransactionID: number;
    TransactionAmount: number;
    TransactionCurrency: En_Currency;
    TransactionSender: VM_User;
    TransactionReceiver: VM_User;
    Tag:VM_Tag;
    Application:VM_Application;
    Obligation: VM_Obligation;
    TransactionAccount: VM_Account;
    PaymentAccount: VM_PaymentAccount;
    IsConfirmed: boolean;
    IsConfirmedBySender: boolean;
    IsConfirmedByReceiver: boolean;
    TransactionDateTime: Date;
    TransactionMemo: String
    TransferType: EN_TransferType
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}