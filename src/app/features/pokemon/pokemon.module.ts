import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonSummaryListComponent } from './pokemon-summary-list/pokemon-summary-list.component';
import { PokemonSummaryComponent } from './pokemon-summary/pokemon-summary.component';
import { FormsModule } from '@angular/forms';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonSummaryListSidebarComponent } from './pokemon-summary-list-sidebar/pokemon-summary-list-sidebar.component';
import { PokemonBaseList } from './pokemon-base-list/pokemon-base-list.component';
import { PokemonSummaryCardComponent } from './pokemon-summary-card/pokemon-summary-card.component';
import { PokemonSummaryTileComponent } from './pokemon-summary-tile/pokemon-summary-tile.component';

@NgModule({
  declarations: [
    PokemonSummaryListComponent,
    PokemonSummaryComponent,
    PokemonDetailsComponent,
    PokemonSummaryListSidebarComponent,
    PokemonBaseList,
    PokemonSummaryCardComponent,
    PokemonSummaryTileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonRoutingModule,
  ],
  exports: [
    PokemonSummaryListComponent,
    // Pas nécessaire : PokemonRoutingModule,
  ]
})
export class PokemonModule { }