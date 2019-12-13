import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChooseDoctorComponent } from './patient-choose-doctor.component';

describe('PatientChooseDoctorComponent', () => {
  let component: PatientChooseDoctorComponent;
  let fixture: ComponentFixture<PatientChooseDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChooseDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientChooseDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
