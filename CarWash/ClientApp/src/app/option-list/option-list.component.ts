import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';
import { Service } from '@shared/models/car-wash-service.model';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css'],
  providers: [DataService]
})
export class OptionListComponent implements OnInit {
  
  items: IService[] = [];

  constructor(private dataService: DataService) {
  }
  
  ngOnInit() {
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

  sayHello(){
    console.log('hello!');
  }
}
