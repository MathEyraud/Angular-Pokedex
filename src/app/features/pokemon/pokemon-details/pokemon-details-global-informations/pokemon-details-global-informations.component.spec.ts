import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsGlobalInformationsComponent } from './pokemon-details-global-informations.component';

describe('PokemonDetailsGlobalInformationsComponent', () => {
  let component: PokemonDetailsGlobalInformationsComponent;
  let fixture: ComponentFixture<PokemonDetailsGlobalInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailsGlobalInformationsComponent]
    });
    fixture = TestBed.createComponent(PokemonDetailsGlobalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
