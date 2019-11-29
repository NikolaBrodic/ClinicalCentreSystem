import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsExaminationComponent } from './doctors-examination.component';

describe('DoctorsExaminationComponent', () => {
  let component: DoctorsExaminationComponent;
  let fixture: ComponentFixture<DoctorsExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
