import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBaseListComponent } from './pokemon-base-list.component';

describe('PokemonBaseListComponent', () => {
  let component: PokemonBaseListComponent;
  let fixture: ComponentFixture<PokemonBaseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonBaseListComponent]
    });
    fixture = TestBed.createComponent(PokemonBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
