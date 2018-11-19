import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ICalendarItem, CalendarItem } from '../calendar-carousel-item/calendar-carousel-item.model';

@Component({
  selector: 'calendar-carousel',
  templateUrl: './calendar-carousel.component.html',
  styleUrls: [
    './calendar-carousel.component.css',
    './nav-arrows.css',
  ],
  providers: [NgbCarouselConfig]
})
export class CalendarCarouselComponent implements OnInit {
  @ViewChild('carousel') carousel: any;
  items : ICalendarItem[];
  
  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
    this.items = [
      new CalendarItem(19, 'NOV', 'Monday'),
      new CalendarItem(20, 'NOV', 'Tuesday'),
      new CalendarItem(21, 'NOV', 'Wednesday'),
      new CalendarItem(22, 'NOV', 'Thursday'),
      new CalendarItem(23, 'NOV', 'Friday'),
      new CalendarItem(24, 'NOV', 'Saturday'),
      new CalendarItem(25, 'NOV', 'Sunday'),
    ];
  }

  ngOnInit() {
  }

  nextDay(){
    this.carousel.next();
  }

  prevDay(){
     this.carousel.prev();
  }

  sayHello(){
    console.log('hello!');
  }
}
