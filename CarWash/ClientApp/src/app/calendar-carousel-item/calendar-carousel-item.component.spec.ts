import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCarouselItemComponent } from './calendar-carousel-item.component';

describe('CalendarCarouselItemComponent', () => {
  let component: CalendarCarouselItemComponent;
  let fixture: ComponentFixture<CalendarCarouselItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCarouselItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
