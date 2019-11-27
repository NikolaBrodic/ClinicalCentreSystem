import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExaminationsRequestComponent } from './list-examinations-request.component';

describe('ListExaminationsRequestComponent', () => {
  let component: ListExaminationsRequestComponent;
  let fixture: ComponentFixture<ListExaminationsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExaminationsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExaminationsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
