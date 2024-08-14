import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListHomeComponent } from './pokemon-list/pokemon-list-home/pokemon-list-home.component';
import { PokemonSummaryComponent } from './pokemon-summary/pokemon-summary.component';
import { FormsModule } from '@angular/forms';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonListSidebarComponent } from './pokemon-list/pokemon-list-sidebar/pokemon-list-sidebar.component';
import { PokemonSummaryCardComponent } from './pokemon-summary/pokemon-summary-card/pokemon-summary-card.component';
import { PokemonSummaryTileComponent } from './pokemon-summary/pokemon-summary-tile/pokemon-summary-tile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovesModule } from '../moves/moves.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonEvolutionCardComponent } from './pokemon-evolution-card/pokemon-evolution-card.component';

@NgModule({
  declarations: [
    PokemonListHomeComponent,
    PokemonSummaryComponent,
    PokemonDetailsComponent,
    PokemonListSidebarComponent,
    PokemonListComponent,
    PokemonSummaryCardComponent,
    PokemonSummaryTileComponent,
    PokemonEvolutionCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonRoutingModule,
    SharedModule,
    MovesModule,
  ],
  exports: [
    PokemonListHomeComponent,
  ]
})
export class PokemonModule { }