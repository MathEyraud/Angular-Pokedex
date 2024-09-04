import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBaseStatsComponent } from './pokemon-base-stats.component';

describe('PokemonBaseStatsComponent', () => {
  let component: PokemonBaseStatsComponent;
  let fixture: ComponentFixture<PokemonBaseStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonBaseStatsComponent]
    });
    fixture = TestBed.createComponent(PokemonBaseStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
