
import { ObligationStatusE } from '../enums'
export class ObligationStatus {
    ObligationStatus:ObligationStatusE
    ObligationStatusNameEng: string
    ObligationStatusNameRus: string
    ObligationStatusComment: string    
    
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}