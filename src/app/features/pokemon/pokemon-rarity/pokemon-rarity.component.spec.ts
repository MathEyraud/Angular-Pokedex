import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonRarityComponent } from './pokemon-rarity.component';

describe('PokemonRarityComponent', () => {
  let component: PokemonRarityComponent;
  let fixture: ComponentFixture<PokemonRarityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonRarityComponent]
    });
    fixture = TestBed.createComponent(PokemonRarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
