export class ObligationRoutingType {
    RoutingTypeID: number;
    RoutingTypeNameEng: string;
    RoutingTypeNameRus: string;
    RoutingTypeComment: string;

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}