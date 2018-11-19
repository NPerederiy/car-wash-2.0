import { Component, OnInit, Input } from '@angular/core';
import { ICalendarItem, CalendarItem } from '../calendar-carousel-item/calendar-carousel-item.model';

@Component({
  selector: 'calendar-carousel-item',
  templateUrl: './calendar-carousel-item.component.html',
  styleUrls: ['./calendar-carousel-item.component.css']
})
export class CalendarCarouselItemComponent implements OnInit {
  @Input() item : ICalendarItem;

  constructor() { }

  ngOnInit() {
  }

}
