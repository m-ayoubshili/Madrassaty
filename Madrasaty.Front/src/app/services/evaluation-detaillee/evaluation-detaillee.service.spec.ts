import { TestBed } from '@angular/core/testing';

import { EvaluationDetailleeService } from './evaluation-detaillee.service';

describe('EvaluationDetailleeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationDetailleeService = TestBed.get(EvaluationDetailleeService);
    expect(service).toBeTruthy();
  });
});
