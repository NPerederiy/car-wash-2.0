import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'time-picker-timeline',
  templateUrl: './time-picker-timeline.component.html',
  styleUrls: ['./time-picker-timeline.component.css']
})

export class TimePickerTimelineComponent implements OnInit {
  @Input() time: number;
  @Input() step : number;
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  @Output() valueChanged = new EventEmitter();
  
  public timeUnits: number[];

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }

  constructor() { 
  }

  ngOnInit() {
    this.generateTimeline();
  }
  
  generateTimeline(){
    this.timeUnits = [];
    let temp = this.decTime(this.time, this.step * 4);
    
    for (let i = 0; i < 7; i++) {
      temp = this.incTime(temp, this.step);
      this.timeUnits.push(temp);
    }
  }

  private incTime(item: number, value: number){
    let temp = item + value;
    if(this.step === 1){ // for hours
      if(temp >= 24){
        temp -= 24;
      }
    } else { // for minutes
      if(temp >= 60){
        temp -= 60;
      }
    }
    return temp;
  }

  private decTime(item: number, value: number){
    let temp = item - value;
    if(this.step === 1){ // for hours
      if(temp < 0){
        temp += 24;
      }
    } else { // for minutes
      if(temp < 0){
        temp += 60;
      }
    }
    return temp;
  }

  up(){
    console.log('up');
    this.time = this.decTime(this.time, this.step);
    this.generateTimeline();
    this.updateTimeValue();
  }

  down(){
    console.log('down');
    this.time = this.incTime(this.time, this.step);
    this.generateTimeline();
    this.updateTimeValue();
  }

  jumpTo(item: any){
    console.log(`jump to ${item}`);
    this.time = item;
    this.generateTimeline();
    this.updateTimeValue();
  }

  private updateTimeValue() {
    this.valueChanged.emit(this.time);
  }

  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(delta > 0) {
      this.up();
      this.mouseWheelUp.emit(event);
    } else if(delta < 0) {
      this.down();
      this.mouseWheelDown.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if(event.preventDefault) {
      event.preventDefault();
    }
  }
}
