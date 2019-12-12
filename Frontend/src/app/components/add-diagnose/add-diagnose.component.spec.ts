import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagnoseComponent } from './add-diagnose.component';

describe('AddDiagnoseComponent', () => {
  let component: AddDiagnoseComponent;
  let fixture: ComponentFixture<AddDiagnoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiagnoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiagnoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
