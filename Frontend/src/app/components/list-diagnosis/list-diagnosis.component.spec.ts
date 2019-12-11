import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiagnosisComponent } from './list-diagnosis.component';

describe('ListDiagnosisComponent', () => {
  let component: ListDiagnosisComponent;
  let fixture: ComponentFixture<ListDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDiagnosisComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
