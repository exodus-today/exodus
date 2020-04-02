import { CreditCardType } from '../enums';

export class CardStore {
    CardID:number
    UserID:number
    TypeID: CreditCardType        
    BankID:number
    BankName:string
    CardNumber:string
    CardValidTill:Date
    AdditionalInfo:string

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}