import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBookedExaminationComponent } from './patient-booked-examination.component';

describe('PatientBookedExaminationComponent', () => {
  let component: PatientBookedExaminationComponent;
  let fixture: ComponentFixture<PatientBookedExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBookedExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBookedExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
