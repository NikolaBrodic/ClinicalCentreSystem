import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExaminationTypeComponent } from './add-examination-type.component';

describe('AddExaminationTypeComponent', () => {
  let component: AddExaminationTypeComponent;
  let fixture: ComponentFixture<AddExaminationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExaminationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExaminationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
