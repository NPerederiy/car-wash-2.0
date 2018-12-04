import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerTimelineComponent } from './time-picker-timeline.component';

describe('TimePickerTimelineComponent', () => {
  let component: TimePickerTimelineComponent;
  let fixture: ComponentFixture<TimePickerTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
