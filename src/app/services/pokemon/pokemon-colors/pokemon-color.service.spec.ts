import { TestBed } from '@angular/core/testing';

import { PokemonColorService } from './pokemon-color.service';

describe('PokemonColorService', () => {
  let service: PokemonColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
