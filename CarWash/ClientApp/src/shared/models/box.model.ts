import { IBox } from "@shared/models/interfaces/box.interface";
import { ITimeSlot } from "@shared/models/interfaces/time-slot.interface";
import { TimeSlot } from "@shared/models/time-slot.model";

export class Box implements IBox{
    private _header: string;
    private _freeTime: ITimeSlot[];
    private _timeCells: boolean[];

    get getHeader(): string { return this._header };
    get getFreeTime(): ITimeSlot[] { return this._freeTime };
    get getTimeCells(): boolean[] { return this._timeCells };

    constructor(header: string) {
        this._header = header;
    }

    isTimeCellFree(id: number): boolean {
        if(id < 0 || id >= this._timeCells.length)
            return false; 
        return this._timeCells[id];
    }

    chooseTimeSlot(){
        console.log('NOT_IMPLEMENTED_FUNC');
    }

    getTimeSlots(): ITimeSlot[] {
        let timeSlots: TimeSlot[] = [];
        
        console.log('NOT_IMPLEMENTED_FUNC');

        return timeSlots;
    }
}