import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAvailableExaminationsComponent } from './patient-available-examinations.component';

describe('PatientAvailableExaminationsComponent', () => {
  let component: PatientAvailableExaminationsComponent;
  let fixture: ComponentFixture<PatientAvailableExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAvailableExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAvailableExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
