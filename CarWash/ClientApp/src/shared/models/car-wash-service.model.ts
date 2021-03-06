import { IService } from "@shared/models/interfaces/car-wash-service.interface";

export class Service implements IService{
    private _id: number;
    private _name: string;
    private _descr: string;
    private _price: number;
    private _leadTime: number;
    private _isChecked: boolean;

    get getId(): number { return this._id; }
    get getName(): string { return this._name; }
    get getDescription(): string { return this._descr; }
    get getPrice(): number { return this._price; }
    get getTime(): number { return this._leadTime; }
    get isChecked(): boolean { return this._isChecked; }

    constructor(id:number, name: string, price: number, time: number, isChecked?: boolean, descr?: string){
      this._id = id;
      this._name = name;
      this._descr = descr || 'no description provided.';
      this._price = price;
      this._leadTime = time;
      this._isChecked = isChecked || false;
    }

    changeCheckedState(){
        this._isChecked = !this._isChecked;
    }
}