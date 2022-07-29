import { TestBed } from '@angular/core/testing';

import { AssiduiteService } from './assiduite.service';

describe('AssiduiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssiduiteService = TestBed.get(AssiduiteService);
    expect(service).toBeTruthy();
  });
});
