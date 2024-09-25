import { TestBed } from '@angular/core/testing';

import { PokemonFormsService } from './pokemon-forms.service';

describe('PokemonFormsService', () => {
  let service: PokemonFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
