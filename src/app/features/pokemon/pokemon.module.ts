import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonSummaryListComponent } from './pokemon-summary-list/pokemon-summary-list.component';
import { PokemonSummaryComponent } from './pokemon-summary/pokemon-summary.component';
import { AddPhotoComponent } from '../photos/add-photo/add-photo.component';
import { FormsModule } from '@angular/forms';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    PokemonSummaryListComponent,
    PokemonSummaryComponent,
    AddPhotoComponent,
    PokemonDetailsComponent,
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