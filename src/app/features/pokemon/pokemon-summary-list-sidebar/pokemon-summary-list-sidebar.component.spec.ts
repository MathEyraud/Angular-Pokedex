import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummaryListSidebarComponent } from './pokemon-summary-list-sidebar.component';

describe('PokemonSummaryListSidebarComponent', () => {
  let component: PokemonSummaryListSidebarComponent;
  let fixture: ComponentFixture<PokemonSummaryListSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSummaryListSidebarComponent]
    });
    fixture = TestBed.createComponent(PokemonSummaryListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
