import { TestBed } from '@angular/core/testing';

import { PeriodicityService } from './periodicity.service';

describe('PeriodicityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodicityService = TestBed.get(PeriodicityService);
    expect(service).toBeTruthy();
  });
});
