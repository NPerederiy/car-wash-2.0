import { Component, OnInit } from '@angular/core';
import { IService, Service } from '../service-list-item/service.model';

@Component({
  selector: 'service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})

export class ServiceListComponent implements OnInit {
  // @ViewChild('totalInfo') totalInfo: HTMLDivElement;

  header: string;
  message: string;
  totalPrice: string;
  totalTime: string;

  tPrice: number = 0;
  tTime: number = 0;
  items: IService[];

  constructor(/*items?: IService[]*/) {
    this.header = 'Service list';
    this.items = /*items ||*/ [
      new Service('Automatic wash', 10, 5),
      new Service('Automatic wash', 10, 5),
      new Service('Automatic wash', 10, 5),
      new Service('Automatic wash', 10, 5)
    ];
  }
  
  ngOnInit() {
    this.refreshTotalInfo();
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