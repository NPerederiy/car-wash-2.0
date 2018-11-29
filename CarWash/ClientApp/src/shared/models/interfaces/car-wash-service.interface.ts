export interface IService {
    getId: number;
    getName: string;
    getDescription: string;
    getPrice: number;
    getTime: number;
    isChecked: boolean;
    changeCheckedState();
}