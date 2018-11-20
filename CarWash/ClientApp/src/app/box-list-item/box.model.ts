export interface IBox{
    getHeader: string;
    getFreeTime: TimeInterval[];
    getTimeCells: boolean[];

    isTimeCellFree(id: number): boolean;
    chooseTimeSlot();
}

export class TimeInterval{
    timeFrom: { hours: number, minutes : number };
    timeTo: { hours: number, minutes : number };
}

export class Box implements IBox{
    private _header: string;
    private _freeTime: TimeInterval[];
    private _timeCells: boolean[];

    get getHeader(): string { return this._header };
    get getFreeTime(): TimeInterval[] { return this._freeTime };
    get getTimeCells(): boolean[] { return this._timeCells };

    constructor() {}

    isTimeCellFree(id: number): boolean {
        if(id < 0 || id >= this._timeCells.length)
            return false; 
        return this._timeCells[id];
    }

    chooseTimeSlot(){
        console.log('NOT_IMPLEMENTED_FUNC');
    }
}