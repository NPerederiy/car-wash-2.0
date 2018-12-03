import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';
import { Service } from '@shared/models/car-wash-service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css'],
  providers: [DataService]
})
export class OptionListComponent implements OnInit {
  btnTitle: string = "Select";
  items: IService[] = [];
  totalTime: number = 0;
  chosenItems: IService[] = [];

  constructor(private dataService: DataService, private router: Router) {
  }
  
  ngOnInit() {
    this.loadWashServiceList();
  }

  loadWashServiceList() {
    this.dataService.getWashServices()
      .subscribe((data: any[]) => {
        data.forEach(e => {
          this.items.push(new Service(e.serviceId, e.name, e.price, e.leadTime, false, e.description));
        });
      })
  }

  selectOptions(){
    if(this.totalTime != 0){
      this.router.navigateByUrl('/pick-time');
    }
  }
  
  checkOption(option: IService){    
    option.changeCheckedState();    
    this.totalTime += option.isChecked ? option.getTime : -option.getTime;
    console.log(`total time: ${this.totalTime}`);
  }
}
