import { TestBed } from '@angular/core/testing';

import { EvolutionChainsService } from './evolution-chains.service';

describe('EvolutionChainsService', () => {
  let service: EvolutionChainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvolutionChainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
