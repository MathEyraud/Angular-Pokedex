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
import { PokemonSummaryCardEvolutionComponent } from './pokemon-summary/pokemon-summary-card-evolution/pokemon-summary-card-evolution.component';
import { PokemonListEvolutionComponent } from './pokemon-list/pokemon-list-evolution/pokemon-list-evolution.component';
import { PokemonDetailsGlobalInformationsComponent } from './pokemon-details/pokemon-details-global-informations/pokemon-details-global-informations.component';
import { InfoSectionComponent } from './pokemon-details/pokemon-details-global-informations/pokemon-details-tabs-informations/info-section/info-section.component';
import { PokemonWeaknessesComponent } from './pokemon-details/pokemon-weaknesses/pokemon-weaknesses.component';
import { PokemonBaseStatsComponent } from './pokemon-details/pokemon-base-stats/pokemon-base-stats.component';

@NgModule({
  declarations: [
    PokemonListHomeComponent,
    PokemonSummaryComponent,
    PokemonDetailsComponent,
    PokemonListSidebarComponent,
    PokemonListComponent,
    PokemonSummaryCardComponent,
    PokemonSummaryTileComponent,
    PokemonSummaryCardEvolutionComponent,
    PokemonListEvolutionComponent,
    PokemonDetailsGlobalInformationsComponent,
    InfoSectionComponent,
    PokemonBaseStatsComponent,
    PokemonWeaknessesComponent,
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