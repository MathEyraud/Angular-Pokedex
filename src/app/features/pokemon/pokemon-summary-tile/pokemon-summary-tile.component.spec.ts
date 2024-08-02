import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummaryTileComponent } from './pokemon-summary-tile.component';

describe('PokemonSummaryTileComponent', () => {
  let component: PokemonSummaryTileComponent;
  let fixture: ComponentFixture<PokemonSummaryTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSummaryTileComponent]
    });
    fixture = TestBed.createComponent(PokemonSummaryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
