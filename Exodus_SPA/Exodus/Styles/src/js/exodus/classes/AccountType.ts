export class AccountType {
    AccountTypeID: number;
    AccountTypeName: string|null;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}