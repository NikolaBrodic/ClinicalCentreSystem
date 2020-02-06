import { TestBed } from '@angular/core/testing';

import { PredefinedAppointmentsService } from './predefined-appointments.service';

describe('PredefinedAppointmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PredefinedAppointmentsService = TestBed.get(PredefinedAppointmentsService);
    expect(service).toBeTruthy();
  });
});
