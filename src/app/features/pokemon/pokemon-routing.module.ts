import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonSummaryListComponent } from './pokemon-summary-list/pokemon-summary-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonSummaryListSidebarComponent } from './pokemon-summary-list-sidebar/pokemon-summary-list-sidebar.component';

const routes: Routes = [

  // Page de la liste des pokemons
  { path: 'list', component: PokemonSummaryListComponent}, 

  { path: 'sidebar', component: PokemonSummaryListSidebarComponent },
  { path: 'sidebar/:id', component: PokemonSummaryListSidebarComponent },

  { path: 'details/:id', component: PokemonDetailsComponent },

  // Page des détails des pokemons
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
