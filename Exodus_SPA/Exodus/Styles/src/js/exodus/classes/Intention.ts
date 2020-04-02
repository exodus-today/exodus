import { Application } from './Application';
import { ObligationKind } from './ObligationKind';
import { ObligationType } from './ObligationType';
import { User } from './user';
import { Tag } from './Tag';
import { Term, Currency, Period } from '../enums'

export class Intention {
    IntentionID: number;
    ObligationType: ObligationType;
    ObligationKind: ObligationKind;
    Period: Period;
    IntentionTerm: Term;
    IntentionIssuer: User;
    IntentionHolder: User;
    IntentionTag: Tag;
    IntentionApplication:  Application;
    IntentionAmount: number;
    CurrencyID: Currency;
    IntentionDurationMonths: number;
    IntentionStartDate: Date;
    IntentionEndDate: Date;    
    IntentionIsActive: boolean;
    IntentionDayOfWeek: number;
    IntentionDayOfMonth: number;
    IntentionMemo: string;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}

