import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestsToRegisterComponent } from './list-requests-to-register.component';

describe('ListRequestsToRegisterComponent', () => {
  let component: ListRequestsToRegisterComponent;
  let fixture: ComponentFixture<ListRequestsToRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequestsToRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestsToRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
