export class HelpDetail {
    HelpDetailID: number
    UserID: number
    UserHelpPeriod: number
    UserHelpAmountCurrency: number
    UserHelpAmountRequired: number
    UserHelpDetails:string
    UpdatedDateTime:Date
    
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}