import { ITimeInterval } from "@shared/models/interfaces/time-interval.interface";

export interface IBox {
    getHeader: string;
    getFreeTime: ITimeInterval[];
    getTimeCells: boolean[];
    isTimeCellFree(id: number): boolean;
    chooseTimeSlot();
}