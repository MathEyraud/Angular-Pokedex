import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListHomeComponent } from './pokemon-list-home.component';

describe('PokemonPhotosListComponent', () => {
  let component: PokemonListHomeComponent;
  let fixture: ComponentFixture<PokemonListHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListHomeComponent]
    });
    fixture = TestBed.createComponent(PokemonListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
