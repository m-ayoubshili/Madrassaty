import { TestBed } from '@angular/core/testing';

import { RecitationDetailService } from './recitation-detail.service';

describe('RecitationDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecitationDetailService = TestBed.get(RecitationDetailService);
    expect(service).toBeTruthy();
  });
});
