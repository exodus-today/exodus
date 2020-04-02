export class ObligationType {
    ObligationTypeID: number
    ObligationTypeNameEng: string
    ObligationTypeNameRus: string
    ObligationTypeComment: string

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}