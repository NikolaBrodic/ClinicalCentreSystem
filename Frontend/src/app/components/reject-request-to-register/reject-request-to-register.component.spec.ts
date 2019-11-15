import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRequestToRegisterComponent } from './reject-request-to-register.component';

describe('RejectRequestToRegisterComponent', () => {
  let component: RejectRequestToRegisterComponent;
  let fixture: ComponentFixture<RejectRequestToRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectRequestToRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectRequestToRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
