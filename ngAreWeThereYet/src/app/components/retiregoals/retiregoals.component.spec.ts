import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiregoalsComponent } from './retiregoals.component';

describe('RetiregoalsComponent', () => {
  let component: RetiregoalsComponent;
  let fixture: ComponentFixture<RetiregoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiregoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiregoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
