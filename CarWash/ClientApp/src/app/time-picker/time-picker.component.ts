import { Component, OnInit} from '@angular/core';
import { Time } from '@shared/models/time.model';
import { TimeConvention } from '@shared/models/time-convention.enum';
import { ITime } from '@shared/models/interfaces/time.interface';

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
  date: Date = new Date();
  stepH: number = 60;
  stepM: number = 15;
 
  constructor() {     
    this.header = "Сhoose a car wash time convenient for you";
    this.btnTitle = "Pick the time";
  }
  
  ngOnInit() {
    this.timeFrom = new Time(this.date.getHours(), this.date.getMinutes(), TimeConvention["24-hour"]);
    console.log('before round(5):'+this.timeFrom);
    this.timeFrom = this.timeFrom.roundTo(this.stepM);
    console.log('after round(5):'+this.timeFrom);
    
    this.timeTo = this.timeFrom.inc(60);
  }

  scrollMinutesUp(time: ITime){
    this.mUp(time);
    console.log("scroll m up");
  }

  scrollMinutesDown(time: ITime){
    this.mDown(time);
    console.log("scroll m down");
  }

  scrollHoursUp(time: ITime){
    this.hUp(time);
    console.log("scroll h up");
  }

  scrollHoursDown(time: ITime){
    this.hDown(time);
    console.log("scroll h down");
  }

  hUp(time: ITime){
    time = time.dec(this.stepH);
    console.log(time);
  }

  mUp(time: ITime){
    time = time.dec(this.stepM);
    console.log(time);
  }

  hDown(time: ITime){
    time = time.inc(this.stepH);
    console.log(time);
  }

  mDown(time: ITime){
    time = time.inc(this.stepM);
    console.log(time);
  }

  pickTime(){
    console.log("picked");
  }
}