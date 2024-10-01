import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePokemonMovesComponent } from './table-pokemon-moves.component';

describe('TablePokemonMovesComponent', () => {
  let component: TablePokemonMovesComponent;
  let fixture: ComponentFixture<TablePokemonMovesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePokemonMovesComponent]
    });
    fixture = TestBed.createComponent(TablePokemonMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
