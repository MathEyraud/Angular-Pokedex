import { TestBed } from '@angular/core/testing';

import { PokemonPaginationService } from './pokemon-pagination.service';

describe('PokemonPaginationService', () => {
  let service: PokemonPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
