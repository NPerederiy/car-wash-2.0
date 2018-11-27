import { ITimeSlot } from "@shared/models/interfaces/time-slot.interface";

export interface IBox {
    getHeader: string;
    getFreeTime: ITimeSlot[];
    getTimeCells: boolean[];
    isTimeCellFree(id: number): boolean;
    chooseTimeSlot();
}