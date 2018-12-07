import { TimePeriod } from "@shared/models/time-period.enum";
import { TimeConvention } from "@shared/models/time-convention.enum";

export interface ITime{
    hours: number;
    minutes: number;
    timePeriod: TimePeriod;
    timeConvention: TimeConvention;

    inc(step: number);
    dec(step: number);
    roundTo(value: number);
    convertToMinutes(): number;
}