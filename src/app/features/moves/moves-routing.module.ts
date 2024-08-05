import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovesComponent } from './moves/moves.component';

const routes: Routes = [

  // Page de la liste des attaques
  { path: 'moves', component: MovesComponent}, 

  // Page de la liste des détails des attaques
  // { path: 'moves/:id', component: XXX },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MovesRoutingModule { }