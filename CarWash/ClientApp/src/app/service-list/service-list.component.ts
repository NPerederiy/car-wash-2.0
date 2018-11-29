import { Component, OnInit } from '@angular/core';
import { Service } from '@shared/models/car-wash-service.model';
import { IService } from "@shared/models/interfaces/car-wash-service.interface";
import { DataService } from './data.service';

@Component({
  selector: 'service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  providers: [DataService]
})

export class ServiceListComponent implements OnInit {
  header: string;
  message: string;
  totalPrice: string;
  totalTime: string;

  tPrice: number = 0;
  tTime: number = 0;
  items: IService[] = [];

  constructor(private dataService: DataService) {
    this.header = 'Service list';
  }
  
  ngOnInit() {
    this.refreshTotalInfo();
    this.loadWashServiceList();
  }

  loadWashServiceList() {
    this.dataService.getWashServices()
      .subscribe((data: any[]) => {
        data.forEach(e => {
          let a = JSON.parse(JSON.stringify(e));
          this.items.push(new Service(a['serviceId'], a['name'], a['price'], a['leadTime'], false, a['description'] ));
        });
      })
  }

  calcTotals(e : IService){
    if(e.isChecked){
      this.tPrice += e.getPrice;
      this.tTime += e.getTime;
    } else {
      this.tPrice -= e.getPrice;
      this.tTime -= e.getTime;
    }
    this.refreshTotalInfo();
  }

  private refreshTotalInfo(){
    if(this.tTime == 0){
      this.message = 'Select services above';
      this.totalPrice = '';
      this.totalTime = '';
    } else {
      this.message = '';
      this.totalPrice = `Price: $${this.tPrice}`;
      this.totalTime = `Time: ${this.tTime} min`;
    }
  }
}