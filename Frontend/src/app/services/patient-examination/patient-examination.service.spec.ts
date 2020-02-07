import { TestBed } from '@angular/core/testing';

import { PatientExaminationService } from './patient-examination.service';

describe('PatientExaminationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientExaminationService = TestBed.get(PatientExaminationService);
    expect(service).toBeTruthy();
  });
});
