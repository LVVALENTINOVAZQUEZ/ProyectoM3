
import { Status } from "../interfaces/AppointmenInterface";
export interface scheduleAppDTO{
    // userId(userId: any): unknown;
    date: Date,
    time: string,
    status: Status,
    userId: number
}


