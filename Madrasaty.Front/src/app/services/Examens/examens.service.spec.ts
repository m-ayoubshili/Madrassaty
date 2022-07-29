import { TestBed, inject } from '@angular/core/testing';

import { ExamensService } from './examens.service';

describe('ExamensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamensService]
    });
  });

  it('should be created', inject([ExamensService], (service: ExamensService) => {
    expect(service).toBeTruthy();
  }));
});
