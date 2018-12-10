import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';

@Injectable()
export class DataService {
    private options = new BehaviorSubject([] as IService[]);
    private price = new BehaviorSubject(0);
    private time = new BehaviorSubject(0);
    private propTime = new BehaviorSubject('');

    selectedOptions = this.options.asObservable();
    totalPrice = this.price.asObservable();
    totalTime = this.time.asObservable();
    proposedTime = this.propTime.asObservable();

    constructor(private http: HttpClient) {}

    getWashOptions() {
        return this.http.get("/api/ServiceList");
    }

    postSelectedTime(timeFrom: string, timeTo: string) {
        let body: { options: IService[], timeFrom: string, timeTo: string };
        console.log(this.options.value);
        
        // body.options = this.options.value;
        // body.timeFrom = timeFrom;
        // body.timeTo = timeTo;
        return this.http.post("/api/Time", body); 
    }

    postSubmit(name: string, phone: string, confirm: boolean) {
        let body: { name: string, phone: string, confirm: boolean };
        // body.name = name;
        // body.phone = phone;
        // body.confirm = confirm;
        return this.http.post("/api/Booking", body); 
    }

    updateProposedTime(time: string) {
        this.propTime.next(time);
    }

    updateSelectedOptions(options: IService[]) {
        this.options.next(options);
    }

    updateTotalPrice(price: number) {
        this.price.next(price);
    }

    updateTotalTime(time: number) {
        this.time.next(time);
    }
}