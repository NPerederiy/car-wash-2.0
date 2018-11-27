import { IService } from "@shared/models/interfaces/car-wash-service.interface";

export class Service implements IService{
    private _name: string;
    private _descr: string;
    private _price: number;
    private _time: number;
    private _isChecked: boolean;

    get getName(): string { return this._name; }
    get getDescription(): string { return this._descr; }
    get getPrice(): number { return this._price; }
    get getTime(): number { return this._time; }
    get isChecked(): boolean { return this._isChecked; }

    constructor(name: string, price: number, time: number, isChecked?: boolean, descr?: string){
      this._name = name;
      this._descr = descr || 'no description provided.';
      this._price = price;
      this._time = time;
      this._isChecked = isChecked || false;
    }

    changeCheckedState(){
        this._isChecked = !this._isChecked;
    }
}