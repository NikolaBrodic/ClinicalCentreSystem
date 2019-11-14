import { TestBed } from '@angular/core/testing';

import { ExaminationTypeService } from './examination-type.service';

describe('ExaminationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExaminationTypeService = TestBed.get(ExaminationTypeService);
    expect(service).toBeTruthy();
  });
});
