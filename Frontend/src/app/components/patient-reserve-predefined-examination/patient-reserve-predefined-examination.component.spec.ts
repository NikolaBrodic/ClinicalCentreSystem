import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReservePredefinedExaminationComponent } from './patient-reserve-predefined-examination.component';

describe('PatientReservePredefinedExaminationComponent', () => {
  let component: PatientReservePredefinedExaminationComponent;
  let fixture: ComponentFixture<PatientReservePredefinedExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReservePredefinedExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReservePredefinedExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
