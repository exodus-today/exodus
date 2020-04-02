 import { EN_TransferType } from '../enums';
 import { Account as VM_Account} from './Account';
 import { AccountType as VM_AccountType} from './AccountType';
 import { User as VM_User} from './User';
 import { ObligationRoutingType as VM_ObligationRoutingType} from './ObligationRoutingType';
 import { TransferType as VM_TransferType} from './TransferType';

export class ObligationRouting {
    RoutingID: number;
    ObligationID: number;
    RoutingType: VM_ObligationRoutingType;
    RoutedByUser:VM_User;
    RoutedToUser:VM_User;
    TransferUser: VM_User;
    TransferType: VM_TransferType;
    AccountType: VM_AccountType|null;
    Account: VM_Account;
    TransferUserCustomDetails:string;
    AccountCustomDetails: string;
    TransferAmount:number;
    TransferAmountCurrency: EN_TransferType;
    DesiredEndDate: String;
    RoutingDT:Date;
    isExecuted:boolean;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}