import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IService } from './service.model';

@Component({
  selector: 'service-list-item',
  templateUrl: './service-list-item.component.html',
  styleUrls: ['./service-list-item.component.css']
})

export class ServiceListItemComponent implements OnInit {
  @Input() service : IService;
  @Output() onServiceChanged = new EventEmitter<IService>();
  
  constructor() { }

  ngOnInit() {
  }

  checkService(){
    this.service.changeCheckedState();
    this.onServiceChanged.emit(this.service);
  }
}
