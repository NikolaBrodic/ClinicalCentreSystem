import { TestBed } from '@angular/core/testing';

import { RequestToRegisterService } from './request-to-register.service';

describe('RequestToRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestToRegisterService = TestBed.get(RequestToRegisterService);
    expect(service).toBeTruthy();
  });
});
