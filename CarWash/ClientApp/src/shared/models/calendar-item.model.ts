import { ICalendarItem } from "@shared/models/interfaces/calendar-item.interface";

export class CalendarItem implements ICalendarItem{
    private _day: number;
    private _month: string;
    private _dayOfWeek: string;

    get getDay(): number { return this._day; }
    get getMonth(): string { return this._month; }
    get getDayOfWeek(): string { return this._dayOfWeek; }

    constructor(day: number, month: string, dayOfWeek: string) {
        this._day = day;
        this._month = month;
        this._dayOfWeek = dayOfWeek;
    }
}