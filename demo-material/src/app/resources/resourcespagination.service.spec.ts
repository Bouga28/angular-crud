import { TestBed } from '@angular/core/testing';

import { ResourcespaginationService } from './resourcespagination.service';

describe('ResourcespaginationService', () => {
  let service: ResourcespaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcespaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
