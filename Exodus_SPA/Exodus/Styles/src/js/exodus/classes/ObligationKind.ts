import { Application } from '../enums';

export class ObligationKind {
    ObligationKindID: number
    ObligationNameEng: string
    ObligationNameRus: string
    ObligationComment: string
    Application: Application

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}