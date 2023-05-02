import { TestBed } from '@angular/core/testing';

import { ReservationspaginationService } from './reservationspagination.service';

describe('ReservationspaginationService', () => {
  let service: ReservationspaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationspaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
