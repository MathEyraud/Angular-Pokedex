import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPhotosListComponent } from './pokemon-summary-list.component';

describe('PokemonPhotosListComponent', () => {
  let component: PokemonPhotosListComponent;
  let fixture: ComponentFixture<PokemonPhotosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonPhotosListComponent]
    });
    fixture = TestBed.createComponent(PokemonPhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
