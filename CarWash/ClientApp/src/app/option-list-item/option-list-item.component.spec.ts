import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionListItemComponent } from './option-list-item.component';

describe('OptionListItemComponent', () => {
  let component: OptionListItemComponent;
  let fixture: ComponentFixture<OptionListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
