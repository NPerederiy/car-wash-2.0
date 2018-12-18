import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';
import { Service } from '@shared/models/car-wash-service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})

export class OptionListComponent implements OnInit {
  header: string;
  btnTitle: string;
  items: IService[] = [];
  totalTime: number = 0;
  totalPrice: number = 0;
  selectedOptions: IService[] = [];

  constructor(private dataService: DataService, private router: Router) {
    this.header = "Select the car wash services you need";
    this.btnTitle = "Select";
  }
  
  ngOnInit() {
    this.loadWashServiceList();
    this.dataService.totalTime.subscribe(time => this.totalTime = time);
    this.dataService.totalPrice.subscribe(price => this.totalPrice = price);
    this.dataService.selectedOptions.subscribe(option => this.selectedOptions = option);
  }

  loadWashServiceList() {
    this.dataService.getWashOptions()
      .subscribe((data: any) => {
        data.forEach(e => {
          this.items.push(new Service(e._id, e._name, e._price, e._leadTime, false, e._descr));
        }),
        error => console.error(error);
      })
  }

  selectOptions(){
    if(this.totalTime != 0){
      this.selectedOptions = [];
      this.items.forEach(i => {
        if(i.isChecked){
          this.selectedOptions.push(i);
        }
      });
      this.dataService.updateSelectedOptions(this.selectedOptions);
      this.router.navigateByUrl('/pick-time');
    }
  }
  
  checkOption(option: IService){    
    option.changeCheckedState();    

    if(option.isChecked){
      this.dataService.updateTotalTime(this.totalTime + option.getTime);
      this.dataService.updateTotalPrice(this.totalPrice + option.getPrice);
    } else {
      this.dataService.updateTotalTime(this.totalTime - option.getTime);
      this.dataService.updateTotalPrice(this.totalPrice - option.getPrice);
    }

    console.log(`total time: ${this.totalTime}`);
    console.log(`total price: ${this.totalPrice}`);
  }
}
