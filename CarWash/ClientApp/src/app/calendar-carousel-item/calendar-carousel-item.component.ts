import { Component, OnInit, Input } from '@angular/core';
import { ICalendarItem } from "@shared/models/interfaces/calendar-item.interface";

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
