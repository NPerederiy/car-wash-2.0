import { ITime } from "@shared/models/interfaces/time.interface";
import { TimePeriod } from "@shared/models/time-period.enum";
import { TimeConvention } from "@shared/models/time-convention.enum";

export class Time implements ITime{
    static get MINUTES_IN_HOUR(): number { return 60 };
    static get HOURS_IN_HALFDAY(): number { return 12 };
    static get HOURS_IN_DAY(): number { return 24 };
    
    private _hours: number;
    private _minutes : number;
    private _timePeriod: TimePeriod;
    private _timeConvention: TimeConvention;

    get hours(): number { return this._hours }
    get minutes(): number { return this._minutes }
    get timePeriod(): TimePeriod { return this._timePeriod }
    get timeConvention(): TimeConvention { return this._timeConvention }

    constructor(hours?: number, minutes?: number, timeConvention?: TimeConvention, timePeriod?: TimePeriod) {
        this._hours = hours || 0;
        this._minutes = minutes || 0;
        this._timeConvention = timeConvention || TimeConvention["12-hour"];
        this._timePeriod = timePeriod || TimePeriod.AM;
    }
    
    toString(){
        let format = this._timeConvention == TimeConvention["12-hour"] ? 
            this._timePeriod == TimePeriod.AM ? ' a.m.' : ' p.m.' : '';
        return `${addZeros(changeHourDisplay(this._hours))}:${addZeros(this._minutes)}${format}`;
        
        function addZeros(a: number): string{
            return (a - a % 10) / 10 == 0  ? `0${a}` : `${a}`;
        }

        function changeHourDisplay(a: number): number{
            return a == 0  ? 12 : a;
        }
    }

    increment(step: number){
        return Time.convertToTime(this.convertToMinutes() + step, this._timeConvention);
    }

    convertToMinutes(): number{
        let h = this._hours;
        if( this._timeConvention == TimeConvention["12-hour"] && this._timePeriod == TimePeriod.PM){
            h += 12; // !!!!! attention when the time is 12:XX pm
        }
        return Time.convertToMinutes(h, this._minutes);
    }

    static convertToTime(minutes: number, timeConvention?: TimeConvention): Time{
        let h = 0;
        let m = 0;
        
        {
            let temp = split(minutes, this.MINUTES_IN_HOUR);
            h = temp.a;
            m = temp.b;
        }
        
        switch(timeConvention){
            case TimeConvention["12-hour"]:{
                let temp = split(h, this.HOURS_IN_HALFDAY);
                let tp = temp.a % 2 == 0 ? TimePeriod.AM : TimePeriod.PM;
                return new Time(temp.b, m, timeConvention, tp);
            }
            case TimeConvention["24-hour"]:{
                let temp = split(h, this.HOURS_IN_HALFDAY);
                return new Time(temp.b, m, timeConvention);
            }
        }

        function split(timeUnit: number, divisor: number): { a: number, b: number }{
            let a = 0;        // f.e.  a - hours
            let b = timeUnit; // f.e.  b - minutes

            a += div(b, divisor);
            b -= a * divisor;

            return {a, b};
        }

        function div(val, by){
            return (val - val % by) / by;
        }
    }

    static convertTominutes(time: Time): number{
        return this.convertToMinutes(time.hours, time.minutes);
    }

    static convertToMinutes(hours: number, minutes: number): number{
        return hours * this.MINUTES_IN_HOUR + minutes;
    }
}