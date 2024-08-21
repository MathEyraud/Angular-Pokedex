import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListEvolutionComponent } from './pokemon-list-evolution.component';

describe('PokemonListEvolutionComponent', () => {
  let component: PokemonListEvolutionComponent;
  let fixture: ComponentFixture<PokemonListEvolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListEvolutionComponent]
    });
    fixture = TestBed.createComponent(PokemonListEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
