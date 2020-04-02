import { Status } from './enums';

class Model {
    constructor(params: any) {
        Object.assign(this, params);
    }
}

export class User extends Model{
    ID: number;
    FirstName: string;
    LastName: string;
    Status: Status;
}
