import { TestBed } from '@angular/core/testing';

import { StudentDisciplineLevelService } from './student-discipline-level.service';

describe('StudentDisciplineLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentDisciplineLevelService = TestBed.get(StudentDisciplineLevelService);
    expect(service).toBeTruthy();
  });
});
