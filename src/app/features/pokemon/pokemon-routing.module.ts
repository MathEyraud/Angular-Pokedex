import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListHomeComponent } from './pokemon-list/pokemon-list-home/pokemon-list-home.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonListSidebarComponent } from './pokemon-list/pokemon-list-sidebar/pokemon-list-sidebar.component';

const routes: Routes = [

  // Page de la liste des pokemons
  { path: 'pokemon', component: PokemonListHomeComponent}, 

  // Page des détails des pokemons
  { path: 'pokemon/:id', component: PokemonListSidebarComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }