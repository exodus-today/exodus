export class Application {
    ApplicationID:number;
    ApplicationNameEng:string;
    ApplicationNameRus: string;
    ApplicationDescription: string;
    ApplicationIsActive:boolean;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}