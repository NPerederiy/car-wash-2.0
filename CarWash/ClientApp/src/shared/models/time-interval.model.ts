import { Time } from "@shared/models/time.model";
import { ITimeInterval } from "./interfaces/time-interval.interface";

export class TimeInterval implements ITimeInterval{
    timeFrom: Time;
    timeTo: Time;
    
    constructor(timefrom: Time, timeto: Time) 
    {
        this.timeFrom = timefrom;
        this.timeTo = timeto;
    }
}

