
import { EN_TransferType } from '../enums';
export class TransferType {
    NameEng: string;
    NameRus: string;
    Type: EN_TransferType;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}