import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSearchClinicsComponent } from './patient-search-clinics.component';

describe('PatientSearchClinicsComponent', () => {
  let component: PatientSearchClinicsComponent;
  let fixture: ComponentFixture<PatientSearchClinicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSearchClinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSearchClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
