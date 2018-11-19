import { Component, OnInit } from '@angular/core';
import { IService, Service } from '../service-list-item/service.model';

@Component({
  selector: 'service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})

export class ServiceListComponent implements OnInit {
  header: string;
  total: string;
  totalPrice: number = 0;
  totalTime: number = 0;
  items: IService[];

  constructor(/*items?: IService[]*/) {
    this.header = 'Service list';
    this.total = `Total:  $${this.totalPrice} - ${this.totalTime} min`;
    this.items = /*items ||*/ [
      new Service('Automatic wash', 10, 5),
      new Service('Automatic wash', 10, 5),
      new Service('Automatic wash', 10, 5),
      new Service('Automatic wash', 10, 5)
    ];
   }

  ngOnInit() {
    document.addEventListener('OnServiceChecked', ()=>{
      this.totalPrice = 0;
      this.totalTime = 0;
      console.log('hey!!');
      this.items.forEach(item => {
        if(item.isChecked)
        {
          this.totalPrice += item.getPrice;
          this.totalTime += item.getTime;
        }
      });
    });
  }
}