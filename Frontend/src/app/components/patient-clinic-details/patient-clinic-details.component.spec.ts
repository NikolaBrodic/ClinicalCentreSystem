import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientClinicDetailsComponent } from './patient-clinic-details.component';

describe('PatientClinicDetailsComponent', () => {
  let component: PatientClinicDetailsComponent;
  let fixture: ComponentFixture<PatientClinicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientClinicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientClinicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
