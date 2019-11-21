import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClinicAdministratorComponent } from './add-clinic-administrator.component';

describe('AddClinicAdministratorComponent', () => {
  let component: AddClinicAdministratorComponent;
  let fixture: ComponentFixture<AddClinicAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClinicAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClinicAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
