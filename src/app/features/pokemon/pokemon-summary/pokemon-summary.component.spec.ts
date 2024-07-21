import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPhotoComponent } from './pokemon-summary.component';

describe('PokemonPhotoComponent', () => {
  let component: PokemonPhotoComponent;
  let fixture: ComponentFixture<PokemonPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonPhotoComponent]
    });
    fixture = TestBed.createComponent(PokemonPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
