import { Time } from "@angular/common";

export interface Reservation {
    id: number;
    deb: Date;
    heuredeb: string;
    fin: Date;
    heurefin:string;
    approval: boolean;
    validation: boolean;
    resource_id:number;
    user_id: number;
}
