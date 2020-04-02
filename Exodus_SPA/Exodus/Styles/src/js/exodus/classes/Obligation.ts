import { Application } from './Application';
import { ObligationKind } from './ObligationKind';
import { ObligationClass } from './ObligationClass';
import { ObligationStatus } from './ObligationStatus';
import { ObligationType } from './ObligationType';
import { User } from './user';
import { Tag } from './Tag';
import { Currency, Period } from '../enums'

export class Obligation {
    ObligationID: number
    ObligationKind: ObligationKind
    ObligationCurrency: Currency
    AmountPerPayment: number
    AmountDue: number
    AmountTotal: number
    IsActive: boolean
    ObligationPeriod: Period
    ObligationDate: Date
    ObligationExpiration: Date
    ObligationClass: ObligationClass
    ObligationStatus: ObligationStatus
    ObligationType: ObligationType
    ObligationApplication: Application
    ObligationTag: Tag
    ObligationIssuer: User
    ObligationHolder: User

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}

