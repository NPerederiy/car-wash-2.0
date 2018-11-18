import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCarouselComponent } from './calendar-carousel.component';

describe('CalendarCarouselComponent', () => {
  let component: CalendarCarouselComponent;
  let fixture: ComponentFixture<CalendarCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
