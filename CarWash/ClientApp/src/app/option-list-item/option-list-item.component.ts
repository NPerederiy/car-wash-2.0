import { Component, OnInit, Input } from '@angular/core';
import { IService } from '@shared/models/interfaces/car-wash-service.interface';

@Component({
  selector: 'option-list-item',
  templateUrl: './option-list-item.component.html',
  styleUrls: ['./option-list-item.component.css']
})

export class OptionListItemComponent implements OnInit {
  @Input() option : IService;
  description: string = '';

  constructor() { 
  }
  
  ngOnInit() {
    let temp = this.option.getDescription.split('\\n');    
    temp.forEach(e => {
      this.description += e + '<br/>';
    });
  }

  getCheckmarkOpacity() {
    return this.option.isChecked ? 0.7 : 0;
  }
}
