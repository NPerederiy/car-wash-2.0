import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    private options = new BehaviorSubject([] as IService[]);
    private price = new BehaviorSubject(0);
    private time = new BehaviorSubject(0);
    private propTime = new BehaviorSubject('');
    private proposedTimeSlotId: number;
    private changedTimeSlots: number[];
    private serverURI = "http://localhost:59511";

    selectedOptions = this.options.asObservable();
    totalPrice = this.price.asObservable();
    totalTime = this.time.asObservable();
    proposedTime = this.propTime.asObservable();

    constructor(private http: HttpClient) {}

    getWashOptions() {        
        return this.http.get(`${this.serverURI}/api/ServiceList`);
    }

    async postSelectedTime(timeFrom: string, timeTo: string): Promise<boolean> {       
        let body: any = {};   
        let identifiers: number[] = [];     
        this.options.value.forEach(o => {
            identifiers.push(o.getId);       
        });
        body.selectedOptionId = identifiers;
        body.timeFrom = timeFrom;
        body.timeTo = timeTo;
        return await this.http.post(`${this.serverURI}/api/Time`, body).toPromise()
            .then(
                (data: any) => {      
                    this.updateProposedTime(data.time);
                    this.proposedTimeSlotId = data.id;
                    this.changedTimeSlots = data.changedSlots;                    
                    return true;
                }
            )
            .catch( error => {
                console.error(error);
                return false;
            });
    }
        
    async postAnswer(isConfirmed: boolean, name?: string, phone?: string): Promise<boolean> {
        let body: any = {};
        body.name = name || "";
        body.phone = phone || "";
        body.confirm = isConfirmed;
        body.timeslotId = this.proposedTimeSlotId;
        body.changedSlots = this.changedTimeSlots;
        console.log("changedSlots: ", this.changedTimeSlots);
        return await this.http.post(`${this.serverURI}/api/Booking`, body).toPromise()
            .then(
                data => {      
                    console.log(data);
                    return true;
                }
            )
            .catch( error => {
                console.error(error);
                return false;
            });;
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