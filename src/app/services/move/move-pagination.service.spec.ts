import { TestBed } from '@angular/core/testing';

import { MovePaginationService } from './move-pagination.service';

describe('MovePaginationService', () => {
  let service: MovePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
