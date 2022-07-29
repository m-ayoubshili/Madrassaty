import { TestBed } from '@angular/core/testing';

import { EvaluationsEtudiantService } from './evaluations-etudiant.service';

describe('EvaluationsEtudiantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationsEtudiantService = TestBed.get(EvaluationsEtudiantService);
    expect(service).toBeTruthy();
  });
});
