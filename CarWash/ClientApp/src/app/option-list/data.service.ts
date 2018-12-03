import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class DataService {
 
    private url = "/api/ServiceList";
 
    constructor(private http: HttpClient) {
    }
 
    getWashServices() {
        return this.http.get(this.url);
    }
}