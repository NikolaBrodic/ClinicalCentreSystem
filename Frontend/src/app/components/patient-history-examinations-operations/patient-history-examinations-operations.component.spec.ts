import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryExaminationsOperationsComponent } from './patient-history-examinations-operations.component';

describe('PatientHistoryExaminationsOperationsComponent', () => {
  let component: PatientHistoryExaminationsOperationsComponent;
  let fixture: ComponentFixture<PatientHistoryExaminationsOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistoryExaminationsOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistoryExaminationsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
