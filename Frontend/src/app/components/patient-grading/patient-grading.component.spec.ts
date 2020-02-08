import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGradingComponent } from './patient-grading.component';

describe('PatientGradingComponent', () => {
  let component: PatientGradingComponent;
  let fixture: ComponentFixture<PatientGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
