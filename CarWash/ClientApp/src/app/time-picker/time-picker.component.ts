import { Component, OnInit} from '@angular/core';
import { Time } from '@shared/models/time.model';
import { TimeConvention } from '@shared/models/time-convention.enum';
import { ITime } from '@shared/models/interfaces/time.interface';
import { TimeUnit } from '@shared/models/time-unit.enum';
 
@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})

export class TimePickerComponent implements OnInit {
  header: string;
  btnTitle: string;
  timeFrom: Time;
  timeTo: Time;
  stepH: number = 1;
  stepM: number = 10;
  private date: Date = new Date();
 
  constructor() {     
    this.header = "Сhoose a car wash time convenient for you";
    this.btnTitle = "Pick the time";
  }
  
  ngOnInit() {
    this.timeFrom = new Time(this.date.getHours(), this.date.getMinutes()+1, TimeConvention["24-hour"]);
    console.log(`before round(${this.stepM}): ${this.timeFrom}`);
    this.timeFrom = this.timeFrom.roundTo(this.stepM);
    console.log(`after round(${this.stepM}): ${this.timeFrom}`);
    
    this.timeTo = this.timeFrom.inc(60);
  }

  updateHoursFrom(value: any){
    this.updateTime(this.timeFrom, TimeUnit.Hour, value);
  }

  updateMinutesFrom(value: any){
    this.updateTime(this.timeFrom, TimeUnit.Minute, value);
  }

  updateHoursTo(value: any){
    this.updateTime(this.timeTo, TimeUnit.Hour, value);
  }

  updateMinutesTo(value: any){
    this.updateTime(this.timeTo, TimeUnit.Minute, value);
  }

  private updateTime(time: ITime, unit: TimeUnit, value: number){
    console.log(`time is ${time}`);
    if(unit === TimeUnit.Hour){
      time.hours = value;
    } else {
      time.minutes = value;
    }
    console.log(`new time value: ${time}`);
  }

  pickTime(){
    console.log("picked");
  }
}