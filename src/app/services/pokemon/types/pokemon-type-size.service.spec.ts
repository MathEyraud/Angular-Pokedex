import { TestBed } from '@angular/core/testing';

import { PokemonTypeSizeService } from './pokemon-type-size.service';

describe('PokemonTypeSizeService', () => {
  let service: PokemonTypeSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonTypeSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
