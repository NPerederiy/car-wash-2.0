import { Component, OnInit } from '@angular/core';
import { ITime } from '@shared/models/interfaces/time.interface';
import { ITimeInterval } from '@shared/models/interfaces/time-interval.interface';
import { Time } from '@shared/models/time.model';
import { TimeInterval } from '@shared/models/time-interval.model';
import { TimeConvention } from '@shared/models/time-convention.enum';
import { TimePeriod } from '@shared/models/time-period.enum';

@Component({
  selector: 'time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.css']
})

export class TimeBarComponent implements OnInit {
  header = 'Time';
  step = 15; // minutes
  worktime: ITimeInterval;
  timeSlots: ITime[];

  constructor() {
    this.worktime = new TimeInterval( 
      new Time(9, 0, TimeConvention["12-hour"], TimePeriod.AM), 
      new Time(10, 0, TimeConvention["12-hour"], TimePeriod.PM)
    );
    this.generateSlots(this.calcSlotCount(this.worktime, this.step));
   }

  ngOnInit() {
  }

  generateSlots(slotCount: number){
    let time = this.worktime.timeFrom;
    let temp: Time;
    this.timeSlots = [ time ];
    for (let i = 1; i <= slotCount; i++) {
      temp = time.inc(this.step)
      this.timeSlots.push(temp);      
      time = temp;
    }
  }
  
  calcSlotCount(interval: ITimeInterval, step: number): number{
    return div(interval.timeTo.convertToMinutes() - interval.timeFrom.convertToMinutes(), step);
    
    function div(val, by){
        return (val - val % by) / by;
    }
  }
}
