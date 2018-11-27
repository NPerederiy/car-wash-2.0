import { Component, OnInit, Input } from '@angular/core';
import { IBox } from "@shared/models/interfaces/box.interface";
import { Time } from '@shared/models/time.model';
import { TimeInterval } from '@shared/models/time-interval.model';
import { TimeConvention } from '@shared/models/time-convention.enum';
import { TimePeriod } from '@shared/models/time-period.enum';
import { ITimeInterval } from '@shared/models/interfaces/time-interval.interface';

@Component({
  selector: 'box-list-item',
  templateUrl: './box-list-item.component.html',
  styleUrls: [
    './box-list-item.component.css'
  ]
})

export class BoxListItemComponent implements OnInit {
  @Input() item : IBox;

  step = 15; // minutes
  worktime: ITimeInterval;
  timeSlots: boolean[] = [];

  constructor() {
    this.worktime = new TimeInterval( 
      new Time(9, 0, TimeConvention["12-hour"], TimePeriod.AM), 
      new Time(10, 0, TimeConvention["12-hour"], TimePeriod.PM)
    );
    this.generateSlots(this.calcSlotCount(this.worktime, this.step)+1);
   } 

  ngOnInit() {
  }

  generateSlots(slotCount: number){
    for (let i = 0; i < slotCount; i++) {
      this.timeSlots.push(true);      
    }
  }

  calcSlotCount(interval: ITimeInterval, step: number): number{
    return div(interval.timeTo.convertToMinutes() - interval.timeFrom.convertToMinutes(), step);
    
    function div(val, by){
        return (val - val % by) / by;
    }
  }
}
