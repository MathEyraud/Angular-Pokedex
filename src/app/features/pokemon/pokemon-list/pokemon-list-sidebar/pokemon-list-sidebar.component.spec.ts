import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListSidebarComponent } from './pokemon-list-sidebar.component';

describe('PokemonListSidebarComponent', () => {
  let component: PokemonListSidebarComponent;
  let fixture: ComponentFixture<PokemonListSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListSidebarComponent]
    });
    fixture = TestBed.createComponent(PokemonListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
