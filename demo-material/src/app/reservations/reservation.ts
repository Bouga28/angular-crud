import { Time } from "@angular/common";
import { Resource } from "../resources/resource";

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
