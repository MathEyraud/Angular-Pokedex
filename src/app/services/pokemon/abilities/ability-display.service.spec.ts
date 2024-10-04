import { TestBed } from '@angular/core/testing';

import { AbilityDisplayService } from './ability-display.service';

describe('AbilityDisplayService', () => {
  let service: AbilityDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbilityDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
