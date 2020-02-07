import { TestBed } from '@angular/core/testing';

import { PatientInformationService } from './patient-information.service';

describe('PatientInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientInformationService = TestBed.get(PatientInformationService);
    expect(service).toBeTruthy();
  });
});
