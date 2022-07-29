import { TestBed } from '@angular/core/testing';

import { TajwidErrorService } from './tajwid-error.service';

describe('TajwidErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TajwidErrorService = TestBed.get(TajwidErrorService);
    expect(service).toBeTruthy();
  });
});
