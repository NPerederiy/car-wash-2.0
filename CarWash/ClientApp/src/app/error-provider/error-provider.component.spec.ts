import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorProviderComponent } from './error-provider.component';

describe('ErrorProviderComponent', () => {
  let component: ErrorProviderComponent;
  let fixture: ComponentFixture<ErrorProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
