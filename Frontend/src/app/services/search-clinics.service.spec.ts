import { TestBed } from '@angular/core/testing';

import { SearchClinicsService } from './search-clinics.service';

describe('SearchClinicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchClinicsService = TestBed.get(SearchClinicsService);
    expect(service).toBeTruthy();
  });
});
