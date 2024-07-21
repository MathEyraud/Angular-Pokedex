import { TestBed } from '@angular/core/testing';

import { PokemonPhotoService } from './pokemon-photo.service';

describe('PokemonPhotoService', () => {
  let service: PokemonPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
