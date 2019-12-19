import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBookExaminationDialogComponent } from './patient-book-examination-dialog.component';

describe('PatientBookExaminationDialogComponent', () => {
  let component: PatientBookExaminationDialogComponent;
  let fixture: ComponentFixture<PatientBookExaminationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBookExaminationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBookExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
