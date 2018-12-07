import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ITime } from '@shared/models/interfaces/time.interface';

@Component({
  selector: 'time-picker-timeline',
  templateUrl: './time-picker-timeline.component.html',
  styleUrls: ['./time-picker-timeline.component.css']
})

export class TimePickerTimelineComponent implements OnInit {
  @Input() time : ITime;
  @Input() step : number;
  @Input() unitToDisplay : TimeUnit;
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  
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
    console.log('timeline: ', this.time);
    
  }
  
  generateTimeline(){
    console.log('step: '+this.step);
    console.log('before dec: '+this.time);
    this.timeUnits = [];
    let temp = this.time.dec(this.step * 4);
    console.log('after dec: '+temp);
    for (let i = 0; i < 7; i++) {
      temp = temp.inc(this.step);
      this.timeUnits.push(this.unitToDisplay == 0 ? temp.hours : temp.minutes);
    }
    console.log(this.timeUnits);   
  }

  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(delta > 0) {
        this.mouseWheelUp.emit(event);
    } else if(delta < 0) {
        this.mouseWheelDown.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if(event.preventDefault) {
        event.preventDefault();
    }
  }

  up(){
    console.log('up');
    console.log(this.time);
    
    this.time = this.time.dec(this.step);
    console.log(this.time);

    this.generateTimeline();
  }

  down(){
    console.log('down');
    console.log(this.time);
    
    this.time = this.time.inc(this.step);
    console.log(this.time);

    this.generateTimeline();
  }

}
