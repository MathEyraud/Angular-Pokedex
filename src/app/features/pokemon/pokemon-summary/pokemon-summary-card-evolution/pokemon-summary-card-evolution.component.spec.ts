import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummaryCardEvolutionComponent } from './pokemon-summary-card-evolution.component';

describe('PokemonSummaryCardEvolutionComponent', () => {
  let component: PokemonSummaryCardEvolutionComponent;
  let fixture: ComponentFixture<PokemonSummaryCardEvolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSummaryCardEvolutionComponent]
    });
    fixture = TestBed.createComponent(PokemonSummaryCardEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
