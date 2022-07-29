import { TestBed, inject } from '@angular/core/testing';

import { MembersListService } from './members-list.service';

describe('MembersListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersListService]
    });
  });

  it('should be created', inject([MembersListService], (service: MembersListService) => {
    expect(service).toBeTruthy();
  }));
});
