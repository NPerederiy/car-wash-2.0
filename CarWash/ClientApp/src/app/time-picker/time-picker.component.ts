import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})

export class TimePickerComponent implements OnInit {
  header: string;
  btnTitle: string;
  hFrom: string[] = ['14','14','14','14','14','14','15']; 
  mFrom: string[] = ['00','10','20','30','40','50','00']; 
  hTo: string[] = ['15','15','15','15','15','15','16']; 
  mTo: string[] = ['00','10','20','30','40','50','00']; 
 
  constructor() { 
    this.header = "Сhoose a car wash time convenient for you";
    this.btnTitle = "Pick the time";
  }

  ngOnInit() {
  }

  scrollUp(e: any){
    console.log("scroll up");
  }

  scrollDown(e: any){
    console.log("scroll down");
  }

  pickTime(){
    console.log("picked");
  }
}