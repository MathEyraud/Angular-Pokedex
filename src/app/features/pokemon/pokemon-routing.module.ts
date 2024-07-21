import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokemonSummaryListComponent } from './pokemon-summary-list/pokemon-summary-list.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [

  // Page de la liste des pokemons
  { path: 'PokemonList', component: PokemonSummaryListComponent}, 

  // Page des détails des pokemons
  { path: 'pokemon/:id', component: PokemonDetailsComponent}, 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
