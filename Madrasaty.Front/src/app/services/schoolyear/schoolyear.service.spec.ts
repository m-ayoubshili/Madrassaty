import { TestBed, inject } from '@angular/core/testing';

import { SchoolyearService } from './schoolyear.service';

describe('SchoolyearService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolyearService]
    });
  });

  it('should be created', inject([SchoolyearService], (service: SchoolyearService) => {
    expect(service).toBeTruthy();
  }));
});
