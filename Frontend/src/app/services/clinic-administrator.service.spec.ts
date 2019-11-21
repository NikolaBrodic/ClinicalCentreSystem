import { TestBed } from '@angular/core/testing';

import { ClinicAdministratorService } from './clinic-administrator.service';

describe('ClinicAdministratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicAdministratorService = TestBed.get(ClinicAdministratorService);
    expect(service).toBeTruthy();
  });
});
