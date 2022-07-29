import { TestBed } from '@angular/core/testing';

import { EvaluationSimpleService } from './evaluation-simple.service';

describe('EvaluationSimpleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationSimpleService = TestBed.get(EvaluationSimpleService);
    expect(service).toBeTruthy();
  });
});
