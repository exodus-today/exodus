import { EN_EventType, EN_EventCategory,EN_ImportantLevel } from '../enums'
import { Tag } from './Tag';
import { Application } from './Application';

export class VM_EventCategory {
    ID: number
    NameEng:string
    NameRus:string
    Comment:string    
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}

export class VM_ImportanLevel {
    ID: number
    ImportantLevel: EN_ImportantLevel
    NameEng:string
    NameRus:string
    Comment:string    
    constructor(initial: any) {
        Object.assign(this, initial);
    }
}

export class VM_EventType {
    ID: number
    Type: EN_EventType
    Category :EN_EventCategory
    EventCategory: VM_EventCategory
    ImportantLevel:EN_ImportantLevel    
    NameEng:string
    NameRus:string
    Comment:string    

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}

export class Event {
    ID: number
    Category: VM_EventCategory
    Type: VM_EventType
    Tag: Tag
    Application: Application
    Added:Date 
    ImportantLevel:VM_ImportanLevel 
    Title:string 

    constructor(initial: any) {
        Object.assign(this, initial);
    }
}