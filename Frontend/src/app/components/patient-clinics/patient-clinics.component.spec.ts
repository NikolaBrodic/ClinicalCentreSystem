import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientClinicsComponent } from './patient-clinics.component';

describe('PatientClinicsComponent', () => {
  let component: PatientClinicsComponent;
  let fixture: ComponentFixture<PatientClinicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientClinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
