import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOfExaminationTypesComponent } from './list-of-examination-types.component';

describe('ListaOfExaminationTypesComponent', () => {
  let component: ListaOfExaminationTypesComponent;
  let fixture: ComponentFixture<ListaOfExaminationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaOfExaminationTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOfExaminationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
