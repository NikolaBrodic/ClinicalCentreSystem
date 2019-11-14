import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovalPatientComponent } from './pending-approval-patient.component';

describe('PendingApprovalPatientComponent', () => {
  let component: PendingApprovalPatientComponent;
  let fixture: ComponentFixture<PendingApprovalPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApprovalPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApprovalPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
