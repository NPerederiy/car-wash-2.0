import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CalendarItem } from './calendar-item.model';
import { ICalendarItem } from "@shared/models/interfaces/calendar-item.interface";
import { DayOfWeek } from '@shared/models/day-of-week.enum';
import { Month } from '@shared/models/month.enum';

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
  date: Date = new Date();

  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;

    this.items = [];
    for (let i = 0; i < 7; i++) {
      this.items.push(new CalendarItem(this.date.getDate(), Month[this.date.getMonth()], DayOfWeek[this.date.getDay()]));
      this.gotoNextDay();
    }
  }

  ngOnInit() {
  }

  nextDay(){
    this.carousel.next();
  }

  prevDay(){
     this.carousel.prev();
  }

  private gotoNextDay(){
    this.date.setDate(this.date.getDate() + 1);
  }
}