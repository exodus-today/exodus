//import { observable } from 'mobx';
import { Period, Currency } from '../enums';

export class TagStore {

    ApplicationID: number;
​​​​    ApplicationUrl: string;​​
    Description: string;
​​​​    Name: string;​​
    NameEng: string;
​​​​    NameRus: string;
​​​​    Owner_UserID: number;
​​​​    OwnerStatusID: number;
​​​​    TagID: number;
    Period: Period;
    Owner_Avatar: string;
    OwnerFirstName: string;
    OwnerLastName: string;
    DaysLeft: number;
    Obligations_Total: number;
    Intentions_Total: number;
    Obligations_Persent: number;
    Intentions_Persent: number;
    TagCurrency: Currency;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}