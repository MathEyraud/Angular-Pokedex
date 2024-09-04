import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonWeaknessesComponent } from './pokemon-weaknesses.component';

describe('PokemonWeaknessesComponent', () => {
  let component: PokemonWeaknessesComponent;
  let fixture: ComponentFixture<PokemonWeaknessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonWeaknessesComponent]
    });
    fixture = TestBed.createComponent(PokemonWeaknessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
