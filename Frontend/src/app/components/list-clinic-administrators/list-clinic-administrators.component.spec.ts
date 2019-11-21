import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClinicAdministratorsComponent } from './list-clinic-administrators.component';

describe('ListClinicAdministratorsComponent', () => {
  let component: ListClinicAdministratorsComponent;
  let fixture: ComponentFixture<ListClinicAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClinicAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClinicAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
