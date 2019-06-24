import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBarComponent } from './finance-bar.component';

describe('FinanceBarComponent', () => {
  let component: FinanceBarComponent;
  let fixture: ComponentFixture<FinanceBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
