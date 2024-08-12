import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummaryCardComponent } from './pokemon-summary-card.component';

describe('PokemonSummaryCardComponent', () => {
  let component: PokemonSummaryCardComponent;
  let fixture: ComponentFixture<PokemonSummaryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSummaryCardComponent]
    });
    fixture = TestBed.createComponent(PokemonSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
