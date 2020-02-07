import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewAndChangeInformationComponent } from './patient-view-and-change-information.component';

describe('PatientViewAndChangeInformationComponent', () => {
  let component: PatientViewAndChangeInformationComponent;
  let fixture: ComponentFixture<PatientViewAndChangeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientViewAndChangeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientViewAndChangeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
