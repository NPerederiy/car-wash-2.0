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

    set hours(h: number){        
        let delta = this._hours - h; 
        if(delta < 0){
            let temp = this.inc(-delta * Time.MINUTES_IN_HOUR);
            this._hours = temp._hours;
            this._minutes = temp._minutes;
        } else {
            let temp = this.dec(delta * Time.MINUTES_IN_HOUR);
            this._hours = temp._hours;
            this._minutes = temp._minutes;
        }
    }
    
    set minutes(m: number){
        let delta = this._minutes - m; 
        if(delta < 0){
            let temp = this.inc(-delta);
            this._hours = temp._hours;
            this._minutes = temp._minutes;
        } else {
            let temp = this.dec(delta);
            this._hours = temp._hours;
            this._minutes = temp._minutes;
        }
    }

    constructor(hours?: number, minutes?: number, timeConvention?: TimeConvention, timePeriod?: TimePeriod) {
        this._hours = hours || 0;
        this._minutes = minutes || 0;
        this._timeConvention = timeConvention || TimeConvention["24-hour"];
        this._timePeriod = timePeriod || TimePeriod.AM;
    }
    
    toString(){
        let format = this._timeConvention == TimeConvention["12-hour"] ? 
            this._timePeriod == TimePeriod.AM ? ' a.m.' : ' p.m.' : '';
        return `${addZeros(changeHourDisplay(this._hours))}:${addZeros(this._minutes)}${format}`;

        function addZeros(a: number): string{
            return (a - a % 10) / 10 == 0 ? `0${a}` : `${a}`;
        }

        // TODO: To fix the problem of displaying time in 12-hour format
        function changeHourDisplay(a: number): number{
            // if(this._timeConvention == TimeConvention["12-hour"] && this._timePeriod == TimePeriod.PM){
            //     return a == 0 ? Time.HOURS_IN_HALFDAY : a;
            // }
            return a;
        }
    }

    inc(step: number){
        return Time.convertToTime(this.convertToMinutes() + step, this._timeConvention);
    }

    dec(step: number){
        let temp = this.convertToMinutes() - step;
        if(temp < 0){
            if(this.timeConvention == TimeConvention["12-hour"]){
                temp += Time.MINUTES_IN_HOUR * Time.HOURS_IN_HALFDAY;
            } else {
                temp += Time.MINUTES_IN_HOUR * Time.HOURS_IN_DAY;
            }
        }
        return Time.convertToTime(temp, this._timeConvention);
    }

    roundTo(value: number){    
        let h = this.hours;
        let m = this.minutes;
        m += value - m % value;       
        if(m >= Time.MINUTES_IN_HOUR){
            m -= Time.MINUTES_IN_HOUR;
            h++;
        }        
        return Time.convertToTime(m + h * Time.MINUTES_IN_HOUR, this._timeConvention);
    }

    convertToMinutes(): number{
        let h = this._hours;
        if( this._timeConvention == TimeConvention["12-hour"] && this._timePeriod == TimePeriod.PM){
            h += Time.HOURS_IN_HALFDAY; // pay attention when the time is 12:XX pm
        }
        return Time.convertToMinutes(h, this._minutes);
    }

    static convertToTime(minutes: number, timeConvention?: TimeConvention): Time{
        let h = 0;
        let m = 0;
        
        {
            let temp = split(minutes, this.MINUTES_IN_HOUR);
            h = temp.h;
            m = temp.m;
        }
        
        switch(timeConvention){
            case TimeConvention["12-hour"]:{
                let temp = split(h, this.HOURS_IN_HALFDAY);
                let tp = temp.h % 2 == 0 ? TimePeriod.AM : TimePeriod.PM;
                return new Time(temp.m, m, timeConvention, tp);
            }
            case TimeConvention["24-hour"]:{
                let temp = split(h, this.HOURS_IN_DAY);
                return new Time(temp.m, m, timeConvention);
            }
        }

        function split(timeUnit: number, divisor: number): { h: number, m: number }{
            let h = 0;
            let m = timeUnit;

            h += div(m, divisor);
            m -= h * divisor;

            return {h, m};
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