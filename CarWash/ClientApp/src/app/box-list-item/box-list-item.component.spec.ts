import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxListItemComponent } from './box-list-item.component';

describe('BoxListItemComponent', () => {
  let component: BoxListItemComponent;
  let fixture: ComponentFixture<BoxListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
