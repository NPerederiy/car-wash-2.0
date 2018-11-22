export interface IService {
    getName: string;
    getDescription: string;
    getPrice: number;
    getTime: number;
    isChecked: boolean;
    changeCheckedState();
}