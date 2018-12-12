import { Component, OnInit} from '@angular/core';
import { Time } from '@shared/models/time.model';
import { TimeConvention } from '@shared/models/time-convention.enum';
import { ITime } from '@shared/models/interfaces/time.interface';
import { TimeUnit } from '@shared/models/time-unit.enum';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';

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
  private totalTime: number;

  constructor(private dataService: DataService, private router: Router) {     
    this.header = "Сhoose a car wash time convenient for you";
    this.btnTitle = "Pick the time";
  }
  
  ngOnInit() {
    this.dataService.totalTime.subscribe(time => this.totalTime = time);

    this.timeFrom = new Time(this.date.getHours(), this.date.getMinutes()+1, TimeConvention["24-hour"]);
    console.log(`before round(${this.stepM}): ${this.timeFrom}`);
    this.timeFrom = this.timeFrom.roundTo(this.stepM);
    console.log(`after round(${this.stepM}): ${this.timeFrom}`);

    if(this.totalTime <= 60){
      this.timeTo = this.timeFrom.inc(60);
    } else {
      this.timeTo = this.timeFrom.inc(Time.roundMinutes(this.totalTime, this.stepM * 3));
    }
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
    this.dataService.postSelectedTime(this.timeFrom.toString(), this.timeTo.toString())
    .subscribe((data: any) => {
      console.log(data);
      
      this.dataService.updateProposedTime(data);
      },
      error => console.error(error)
    );
    this.router.navigateByUrl('/book-time');
  }
}