import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRequestToRegisterComponent } from './approve-request-to-register.component';

describe('ApproveRequestToRegisterComponent', () => {
  let component: ApproveRequestToRegisterComponent;
  let fixture: ComponentFixture<ApproveRequestToRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRequestToRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRequestToRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
