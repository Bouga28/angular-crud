export interface Reservation {
    id: number;
    deb: Date;
    fin: Date;
    approval: boolean;
    resource_id:number;
    user_id: number;
}
