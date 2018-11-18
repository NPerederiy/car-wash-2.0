import { Component, OnInit, Input } from '@angular/core';
import { IService, Service } from './service.model';

@Component({
  selector: 'service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.css']
})

export class ServiceListItemComponent implements OnInit {
  @Input() service : IService;
  
  constructor() { }

  ngOnInit() {
  }

  checkService(){
    this.service.changeCheckedState();
    console.log(this.service.isChecked);
  }

}
