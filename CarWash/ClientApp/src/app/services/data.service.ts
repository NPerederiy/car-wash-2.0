import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';

@Injectable()
export class DataService {
    private options = new BehaviorSubject([] as IService[]);
    private price = new BehaviorSubject(0);
    private time = new BehaviorSubject(0);
    private propTime = new BehaviorSubject('');

    private serverURI = "http://localhost:59511";

    selectedOptions = this.options.asObservable();
    totalPrice = this.price.asObservable();
    totalTime = this.time.asObservable();
    proposedTime = this.propTime.asObservable();

    constructor(private http: Http) {}

    getWashOptions() {
        return this.http.get(`${this.serverURI}/api/ServiceList`)
            .pipe(map(res => res.json()));
    }

    postSelectedTime(timeFrom: string, timeTo: string) {
        let body: any = {};   
        let ids: number[] = [];     
        this.options.value.forEach(el => {
            ids.push(el.getId);       
        });
        body.selectedOptionId = ids;
        body.timeFrom = timeFrom;
        body.timeTo = timeTo;
        
        let headers = new Headers({"Accept": "text/plain"});
        let requestOptions = new RequestOptions({ headers : headers });

        return this.http.post(`${this.serverURI}/api/Time`, body, requestOptions)
            .pipe(map(res => res.text()));
    }

    postAnswer(isConfirmed: boolean, name?: string, phone?: string) {
        let body: any = {};
        body.name = name || "";
        body.phone = phone || "";
        body.confirm = isConfirmed;
        return this.http.post(`${this.serverURI}/api/Booking`, body)
            .pipe(map(res => res.json())); 
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