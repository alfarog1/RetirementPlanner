import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskQuestionnaireComponent } from './risk-questionnaire.component';

describe('RiskQuestionnaireComponent', () => {
  let component: RiskQuestionnaireComponent;
  let fixture: ComponentFixture<RiskQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
